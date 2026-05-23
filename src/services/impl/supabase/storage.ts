import { createClient } from "@/lib/supabase";
import type { ApiResponse } from "@/types";
import type { StorageService } from "@/services/types";

export class SupabaseStorageService implements StorageService {
  private get supabase() {
    return createClient();
  }

  async uploadAvatar(userId: string, file: File): Promise<ApiResponse<string>> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error } = await this.supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      return {
        data: null,
        error: { message: error.message },
      };
    }

    return { data: filePath, error: null };
  }

  getAvatarUrl(path: string): string {
    const { data } = createClient().storage
      .from("avatars")
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
