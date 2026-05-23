"use client";

import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useT } from "@/lib/i18n-client";
import { LanguageSetting } from "@/components/settings/language-setting";

export default function SettingsPage() {
  const t = useT();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.profile')}</CardTitle>
          <CardDescription>{t('settings.profile_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="text-sm font-medium">{t('settings.email')}</span>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div>
            <span className="text-sm font-medium">{t('settings.user_id')}</span>
            <p className="text-sm text-muted-foreground font-mono">{user?.id}</p>
          </div>
        </CardContent>
      </Card>
      <LanguageSetting />
    </div>
  );
}
