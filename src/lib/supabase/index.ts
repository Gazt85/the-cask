// Barrel file — only re-exports the browser client.
// Server-only utilities (createServerSupabaseClient, getProfileId)
// must be imported from '@/lib/supabase/server' directly to avoid
// pulling next/headers into client bundles.
export { createClient } from './client'
