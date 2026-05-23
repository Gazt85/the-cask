'use server'

import { createServerSupabaseClient, getProfileId } from '@/lib/supabase/server'
import type { ApiResponse } from '@/types'
import type { DbWhisky, WhiskySearchParams } from '@/types/database'

export async function searchWhiskies(
  params: WhiskySearchParams
): Promise<ApiResponse<DbWhisky[]>> {
  const profileId = await getProfileId()
  if (!profileId) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('whiskies')
    .select('*')
    .order('name', { ascending: true })
    .limit(50)

  if (params.query) {
    // Escape PostgREST special characters to prevent filter injection
    const sanitized = params.query.replace(/[.,()]/g, '')
    const term = `%${sanitized}%`
    query = query.or(`name.ilike.${term},distillery.ilike.${term}`)
  }

  if (params.country) {
    query = query.eq('country', params.country)
  }

  if (params.style) {
    query = query.eq('style', params.style)
  }

  if (params.region) {
    query = query.eq('region', params.region)
  }

  const { data, error } = await query

  if (error) {
    return { data: null, error: { message: error.message, code: error.code } }
  }

  return { data: data as DbWhisky[], error: null }
}
