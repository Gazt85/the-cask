import type { AuthService, ProfileService, StorageService } from "./types";
import { SupabaseAuthService } from "./impl/supabase/auth";
import { SupabaseProfileService } from "./impl/supabase/profile";
import { SupabaseStorageService } from "./impl/supabase/storage";

/**
 * Service factory — single place to swap backend implementations.
 *
 * MVP  → Supabase implementations (current)
 * Later → new DotNetAuthService, DotNetProfileService, etc.
 *         that call your ASP.NET Core 8 REST API.
 *
 * Nothing else in the app needs to change.
 */

let authService: AuthService;
let profileService: ProfileService;
let storageService: StorageService;

export function getAuthService(): AuthService {
  if (!authService) authService = new SupabaseAuthService();
  return authService;
}

export function getProfileService(): ProfileService {
  if (!profileService) profileService = new SupabaseProfileService();
  return profileService;
}

export function getStorageService(): StorageService {
  if (!storageService) storageService = new SupabaseStorageService();
  return storageService;
}
