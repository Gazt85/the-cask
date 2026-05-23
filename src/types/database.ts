export type BottleStatus = 'sealed' | 'open' | 'finished'

// ============================================================
// RAW DATABASE ROWS (match Supabase schema 1:1)
// ============================================================

export interface DbProfile {
  id: string
  auth_user_id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface DbWhisky {
  id: string
  name: string
  distillery: string
  region: string | null
  country: string
  style: string | null
  age: number | null
  abv: number | null
  description: string | null
  image_url: string | null
  created_at: string
}

export interface DbCollectionBottle {
  id: string
  profile_id: string
  whisky_id: string
  status: BottleStatus
  quantity: number
  notes: string | null
  rating: number | null
  price_paid: number | null
  added_at: string
  opened_at: string | null
  finished_at: string | null
}

export interface DbTastingNote {
  id: string
  bottle_id: string
  profile_id: string
  nose: string | null
  palate: string | null
  finish: string | null
  score: number | null
  tasted_at: string
}

// ============================================================
// JOINED / ENRICHED TYPES (used in the UI)
// ============================================================

// A bottle as it appears in the collection view — includes whisky data
export interface CollectionBottle extends DbCollectionBottle {
  whisky: DbWhisky
}

// A bottle with its full tasting notes history
export interface CollectionBottleDetail extends CollectionBottle {
  tasting_notes: DbTastingNote[]
}

// ============================================================
// FORM INPUT TYPES (for server actions / API routes)
// ============================================================

export interface AddBottleInput {
  whisky_id: string
  quantity?: number
  status?: BottleStatus
  notes?: string
  price_paid?: number
}

export interface UpdateBottleInput {
  status?: BottleStatus
  quantity?: number
  notes?: string
  rating?: number
  price_paid?: number
  opened_at?: string
  finished_at?: string
}

export interface AddTastingNoteInput {
  bottle_id: string
  nose?: string
  palate?: string
  finish?: string
  score?: number
}

export interface WhiskySearchParams {
  query?: string
  country?: string
  style?: string
  region?: string
}