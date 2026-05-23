'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient, getProfileId } from '@/lib/supabase/server'
import type { ApiResponse } from '@/types'
import type { DbTastingNote, AddTastingNoteInput } from '@/types/database'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function addTastingNote(
  input: AddTastingNoteInput
): Promise<ApiResponse<DbTastingNote>> {
  if (!UUID_RE.test(input.bottle_id)) {
    return { data: null, error: { message: 'Invalid bottle ID' } }
  }
  if (input.score != null && (input.score < 1 || input.score > 100 || !Number.isInteger(input.score))) {
    return { data: null, error: { message: 'Score must be an integer between 1 and 100' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('tasting_notes')
    .insert({
      bottle_id: input.bottle_id,
      profile_id: profileId,
      nose: input.nose ?? null,
      palate: input.palate ?? null,
      finish: input.finish ?? null,
      score: input.score ?? null,
    })
    .select()
    .single()

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  revalidatePath(`/cabinet/${input.bottle_id}`)
  return { data: data as DbTastingNote, error: null }
}

export async function updateTastingNote(
  id: string,
  input: Partial<Omit<AddTastingNoteInput, 'bottle_id'>>
): Promise<ApiResponse<DbTastingNote>> {
  if (!UUID_RE.test(id)) {
    return { data: null, error: { message: 'Invalid tasting note ID' } }
  }
  if (input.score != null && (input.score < 1 || input.score > 100 || !Number.isInteger(input.score))) {
    return { data: null, error: { message: 'Score must be an integer between 1 and 100' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('tasting_notes')
    .update(input)
    .eq('id', id)
    .eq('profile_id', profileId)
    .select()
    .single()

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  revalidatePath(`/cabinet/${data.bottle_id}`)
  return { data: data as DbTastingNote, error: null }
}

export async function deleteTastingNote(
  id: string
): Promise<ApiResponse<null>> {
  if (!UUID_RE.test(id)) {
    return { data: null, error: { message: 'Invalid tasting note ID' } }
  }

  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  // Fetch bottle_id before deleting for path revalidation
  const { data: note } = await supabase
    .from('tasting_notes')
    .select('bottle_id')
    .eq('id', id)
    .eq('profile_id', profileId)
    .single()

  const { error } = await supabase
    .from('tasting_notes')
    .delete()
    .eq('id', id)
    .eq('profile_id', profileId)

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  if (note?.bottle_id) {
    revalidatePath(`/cabinet/${note.bottle_id}`)
  }
  return { data: null, error: null }
}
