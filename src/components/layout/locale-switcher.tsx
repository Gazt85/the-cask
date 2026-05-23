'use client'

import { useTransition } from 'react'
import { Languages, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale } from '@/lib/i18n-client'
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n'
import { setLocale } from '@/lib/actions/locale'

export function LocaleSwitcher() {
  const current = useLocale()
  const [, startTransition] = useTransition()

  function handleSelect(locale: Locale) {
    if (locale === current) return
    startTransition(() => {
      setLocale(locale)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <Languages className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleSelect(locale)}
            className="flex items-center justify-between"
          >
            <span>{LOCALE_LABELS[locale]}</span>
            {locale === current && <Check className="h-4 w-4 text-amber" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
