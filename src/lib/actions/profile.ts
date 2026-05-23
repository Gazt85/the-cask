'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ApiResponse } from '@/types'
import type { DbProfile } from '@/types/database'

export async function getProfile(): Promise<ApiResponse<DbProfile>> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: { message: 'Not authenticated' } }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', user.id)
    .single()

  if (error) {
    return { data: null, error: { message: error.message } }
  }

  return { data: data as DbProfile, error: null }
}
