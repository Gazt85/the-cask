import { createClient } from "@/lib/supabase";
import type { ApiResponse, Profile } from "@/types";
import type { ProfileService } from "@/services/types";

export class SupabaseProfileService implements ProfileService {
  private get supabase() {
    return createClient();
  }

  async getProfile(userId: string): Promise<ApiResponse<Profile>> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("auth_user_id", userId)
      .single();

    if (error) {
      return {
        data: null,
        error: { message: error.message, code: error.code },
      };
    }

    return { data: data as Profile, error: null };
  }

  async updateProfile(
    userId: string,
    updates: Partial<Profile>
  ): Promise<ApiResponse<Profile>> {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("auth_user_id", userId)
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: { message: error.message, code: error.code },
      };
    }

    return { data: data as Profile, error: null };
  }
}
