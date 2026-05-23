'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient, getProfileId } from '@/lib/supabase/server'
import type { ApiResponse } from '@/types'
import type {
  BottleStatus,
  CollectionBottle,
  CollectionBottleDetail,
  DbCollectionBottle,
  AddBottleInput,
  UpdateBottleInput,
} from '@/types/database'

// ── Dashboard stats ────────────────────────────────────────────

export interface DashboardCounts {
  total: number
  sealed: number
  open: number
  finished: number
}

export interface RecentNote {
  id: string
  tasted_at: string
  score: number | null
  whisky_name: string
  bottle_id: string
}

export interface DashboardStats {
  counts: DashboardCounts
  avgRating: number | null
  recentNotes: RecentNote[]
  recentBottles: CollectionBottle[]
}

export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const [bottlesResult, recentNotesResult, avgResult, recentResult] = await Promise.all([
    supabase
      .from('collection_bottles')
      .select('status')
      .eq('profile_id', profileId),
    supabase
      .from('tasting_notes')
      .select('id, tasted_at, score, bottle:collection_bottles(id, whisky:whiskies(name))')
      .eq('profile_id', profileId)
      .order('tasted_at', { ascending: false })
      .limit(5),
    supabase
      .from('tasting_notes')
      .select('score')
      .eq('profile_id', profileId)
      .not('score', 'is', null),
    supabase
      .from('collection_bottles')
      .select('*, whisky:whiskies(*)')
      .eq('profile_id', profileId)
      .order('added_at', { ascending: false })
      .limit(5),
  ])

  if (bottlesResult.error) {
    return { data: null, error: { message: bottlesResult.error.message } }
  }

  const bottles = bottlesResult.data ?? []

  const counts: DashboardCounts = {
    total: bottles.length,
    sealed: bottles.filter(b => b.status === 'sealed').length,
    open: bottles.filter(b => b.status === 'open').length,
    finished: bottles.filter(b => b.status === 'finished').length,
  }

  // Average of tasting note scores
  const scoredNotes = avgResult.data ?? []
  const avgRating =
    scoredNotes.length > 0
      ? Math.round(scoredNotes.reduce((sum, n) => sum + (n.score ?? 0), 0) / scoredNotes.length)
      : null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentNotes: RecentNote[] = (recentNotesResult.data ?? []).map((note: any) => ({
    id: note.id,
    tasted_at: note.tasted_at,
    score: note.score,
    whisky_name: note.bottle?.whisky?.name ?? '—',
    bottle_id: note.bottle?.id ?? '',
  }))

  return {
    data: {
      counts,
      avgRating,
      recentNotes,
      recentBottles: (recentResult.data ?? []) as unknown as CollectionBottle[],
    },
    error: null,
  }
}

export async function getBottles(
  status?: BottleStatus
): Promise<ApiResponse<CollectionBottle[]>> {
  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('collection_bottles')
    .select('*, whisky:whiskies(*)')
    .eq('profile_id', profileId)
    .order('added_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  return { data: data as unknown as CollectionBottle[], error: null }
}

export async function getBottle(
  id: string
): Promise<ApiResponse<CollectionBottleDetail>> {
  if (!UUID_RE.test(id)) {
    return { data: null, error: { message: 'Invalid bottle ID' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('collection_bottles')
    .select('*, whisky:whiskies(*), tasting_notes(*)')
    .eq('id', id)
    .eq('profile_id', profileId)
    .order('tasted_at', { ascending: false, referencedTable: 'tasting_notes' })
    .single()

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  return { data: data as unknown as CollectionBottleDetail, error: null }
}

// ── Collection value stats ─────────────────────────────────────

export interface CollectionValueStats {
  totalValue: number
  bottlesWithPrice: number
  totalBottles: number
  byStatus: Record<BottleStatus, number>
  avgBottlePrice: number | null
  mostExpensive: { id: string; whiskyName: string; pricePaid: number } | null
}

export async function getCollectionValue(): Promise<ApiResponse<CollectionValueStats>> {
  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('collection_bottles')
    .select('id, status, quantity, price_paid, whisky:whiskies(name)')
    .eq('profile_id', profileId)

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  const bottles = data ?? []
  const totalBottles = bottles.length

  let totalValue = 0
  let bottlesWithPrice = 0
  const byStatus: Record<BottleStatus, number> = { sealed: 0, open: 0, finished: 0 }
  let mostExpensive: CollectionValueStats['mostExpensive'] = null

  for (const b of bottles) {
    if (b.price_paid != null) {
      const lineValue = b.price_paid * (b.quantity ?? 1)
      totalValue += lineValue
      bottlesWithPrice++
      byStatus[b.status as BottleStatus] += lineValue

      if (!mostExpensive || b.price_paid > mostExpensive.pricePaid) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const whisky = b.whisky as any
        mostExpensive = {
          id: b.id,
          whiskyName: whisky?.name ?? '—',
          pricePaid: b.price_paid,
        }
      }
    }
  }

  return {
    data: {
      totalValue,
      bottlesWithPrice,
      totalBottles,
      byStatus,
      avgBottlePrice: bottlesWithPrice > 0 ? Math.round(totalValue / bottlesWithPrice) : null,
      mostExpensive,
    },
    error: null,
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function addBottle(
  input: AddBottleInput
): Promise<ApiResponse<DbCollectionBottle>> {
  if (!UUID_RE.test(input.whisky_id)) {
    return { data: null, error: { message: 'Invalid whisky ID' } }
  }
  if (input.quantity != null && (input.quantity < 0 || !Number.isInteger(input.quantity))) {
    return { data: null, error: { message: 'Quantity must be a non-negative integer' } }
  }
  if (input.price_paid != null && input.price_paid < 0) {
    return { data: null, error: { message: 'Price must be non-negative' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('collection_bottles')
    .insert({
      profile_id: profileId,
      whisky_id: input.whisky_id,
      status: input.status ?? 'sealed',
      quantity: input.quantity ?? 1,
      notes: input.notes ?? null,
      price_paid: input.price_paid ?? null,
    })
    .select()
    .single()

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  revalidatePath('/cabinet')
  return { data: data as DbCollectionBottle, error: null }
}

export async function updateBottle(
  id: string,
  input: UpdateBottleInput
): Promise<ApiResponse<DbCollectionBottle>> {
  if (!UUID_RE.test(id)) {
    return { data: null, error: { message: 'Invalid bottle ID' } }
  }
  if (input.rating != null && (input.rating < 1 || input.rating > 100 || !Number.isInteger(input.rating))) {
    return { data: null, error: { message: 'Rating must be an integer between 1 and 100' } }
  }
  if (input.quantity != null && (input.quantity < 0 || !Number.isInteger(input.quantity))) {
    return { data: null, error: { message: 'Quantity must be a non-negative integer' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const updates: Record<string, unknown> = {}
  const allowed: (keyof UpdateBottleInput)[] = [
    'status', 'quantity', 'notes', 'rating', 'price_paid', 'opened_at', 'finished_at',
  ]
  for (const key of allowed) {
    if (input[key] !== undefined) updates[key] = input[key]
  }

  // Auto-set timestamps on status transitions
  if (input.status === 'open' && !input.opened_at) {
    updates.opened_at = new Date().toISOString()
  }
  if (input.status === 'finished' && !input.finished_at) {
    updates.finished_at = new Date().toISOString()
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('collection_bottles')
    .update(updates)
    .eq('id', id)
    .eq('profile_id', profileId)
    .select()
    .single()

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  revalidatePath('/cabinet')
  revalidatePath(`/cabinet/${id}`)
  return { data: data as DbCollectionBottle, error: null }
}

export async function deleteBottle(
  id: string
): Promise<ApiResponse<null>> {
  if (!UUID_RE.test(id)) {
    return { data: null, error: { message: 'Invalid bottle ID' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('collection_bottles')
    .delete()
    .eq('id', id)
    .eq('profile_id', profileId)

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  revalidatePath('/cabinet')
  return { data: null, error: null }
}
