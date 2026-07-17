import type { ApiResponse, Profile, User } from "@/types";

/**
 * Service interfaces — the contract between your UI and your backend.
 *
 * MVP: implemented by Supabase (see ./impl/supabase/).
 * Post-MVP: swap with an ASP.NET Core implementation that calls
 *           your .NET 8 REST API. The frontend stays untouched.
 */

export interface AuthService {
  signUp(email: string, password: string): Promise<ApiResponse<User>>;
  signIn(email: string, password: string): Promise<ApiResponse<User>>;
  signInWithGoogle(redirectTo: string): Promise<ApiResponse<null>>;
  signOut(): Promise<ApiResponse<null>>;
  getSession(): Promise<ApiResponse<User>>;
  resetPassword(email: string): Promise<ApiResponse<null>>;
}

export interface ProfileService {
  getProfile(userId: string): Promise<ApiResponse<Profile>>;
  updateProfile(
    userId: string,
    data: Partial<Profile>
  ): Promise<ApiResponse<Profile>>;
}

export interface StorageService {
  uploadAvatar(userId: string, file: File): Promise<ApiResponse<string>>;
  getAvatarUrl(path: string): string;
}
