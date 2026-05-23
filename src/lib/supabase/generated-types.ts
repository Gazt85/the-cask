// Manual Database type — replaces `supabase gen types typescript` output.
// Regenerate with: npx supabase gen types typescript --project-id YOUR_ID > src/lib/supabase/generated-types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          auth_user_id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          auth_user_id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whiskies: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          distillery: string
          region?: string | null
          country: string
          style?: string | null
          age?: number | null
          abv?: number | null
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          distillery?: string
          region?: string | null
          country?: string
          style?: string | null
          age?: number | null
          abv?: number | null
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      collection_bottles: {
        Row: {
          id: string
          profile_id: string
          whisky_id: string
          status: Database["public"]["Enums"]["bottle_status"]
          quantity: number
          notes: string | null
          rating: number | null
          price_paid: number | null
          added_at: string
          opened_at: string | null
          finished_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          whisky_id: string
          status?: Database["public"]["Enums"]["bottle_status"]
          quantity?: number
          notes?: string | null
          rating?: number | null
          price_paid?: number | null
          added_at?: string
          opened_at?: string | null
          finished_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          whisky_id?: string
          status?: Database["public"]["Enums"]["bottle_status"]
          quantity?: number
          notes?: string | null
          rating?: number | null
          price_paid?: number | null
          added_at?: string
          opened_at?: string | null
          finished_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_bottles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_bottles_whisky_id_fkey"
            columns: ["whisky_id"]
            isOneToOne: false
            referencedRelation: "whiskies"
            referencedColumns: ["id"]
          },
        ]
      }
      tasting_notes: {
        Row: {
          id: string
          bottle_id: string
          profile_id: string
          nose: string | null
          palate: string | null
          finish: string | null
          score: number | null
          tasted_at: string
        }
        Insert: {
          id?: string
          bottle_id: string
          profile_id: string
          nose?: string | null
          palate?: string | null
          finish?: string | null
          score?: number | null
          tasted_at?: string
        }
        Update: {
          id?: string
          bottle_id?: string
          profile_id?: string
          nose?: string | null
          palate?: string | null
          finish?: string | null
          score?: number | null
          tasted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasting_notes_bottle_id_fkey"
            columns: ["bottle_id"]
            isOneToOne: false
            referencedRelation: "collection_bottles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasting_notes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bottle_status: "sealed" | "open" | "finished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
