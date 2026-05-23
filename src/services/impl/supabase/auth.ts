import { createClient } from "@/lib/supabase";
import type { ApiResponse, User } from "@/types";
import type { AuthService } from "@/services/types";

export class SupabaseAuthService implements AuthService {
  private get supabase() {
    return createClient();
  }

  async signUp(email: string, password: string): Promise<ApiResponse<User>> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { data: null, error: { message: error.message, code: error.code } };
    }

    const user = data.user;
    if (!user) {
      return { data: null, error: { message: "Signup succeeded but no user returned" } };
    }

    return {
      data: {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at ?? user.created_at,
      },
      error: null,
    };
  }

  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error: { message: error.message, code: error.code } };
    }

    const user = data.user;
    return {
      data: {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at ?? user.created_at,
      },
      error: null,
    };
  }

  async signOut(): Promise<ApiResponse<null>> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      return { data: null, error: { message: error.message } };
    }
    return { data: null, error: null };
  }

  async getSession(): Promise<ApiResponse<User>> {
    const { data, error } = await this.supabase.auth.getUser();

    if (error || !data.user) {
      return { data: null, error: error ? { message: error.message } : null };
    }

    const user = data.user;
    return {
      data: {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at ?? user.created_at,
      },
      error: null,
    };
  }

  async resetPassword(email: string): Promise<ApiResponse<null>> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return { data: null, error: { message: error.message } };
    }
    return { data: null, error: null };
  }
}
