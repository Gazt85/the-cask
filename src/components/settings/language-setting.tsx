'use client'

import { useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocale, useT } from '@/lib/i18n-client'
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n'
import { setLocale } from '@/lib/actions/locale'

export function LanguageSetting() {
  const t = useT()
  const current = useLocale()
  const [pending, startTransition] = useTransition()

  function handleSelect(locale: Locale) {
    if (locale === current) return
    startTransition(() => {
      setLocale(locale)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.language')}</CardTitle>
        <CardDescription>{t('settings.language_desc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {LOCALES.map((locale) => {
            const isActive = locale === current
            return (
              <button
                key={locale}
                type="button"
                onClick={() => handleSelect(locale)}
                disabled={pending}
                className={
                  'rounded-md border px-3 py-1.5 text-sm transition-colors ' +
                  (isActive
                    ? 'border-amber bg-amber/10 text-amber'
                    : 'border-border text-muted-foreground hover:border-amber/30 hover:text-foreground')
                }
              >
                {LOCALE_LABELS[locale]}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
