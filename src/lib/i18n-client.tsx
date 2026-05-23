'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { DEFAULT_LOCALE, dictionaries, type Locale } from './i18n'

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

// Hook returning a translator bound to the active locale.
// Usage:  const t = useT()
//         <h1>{t('cabinet.title')}</h1>
export function useT(): (key: string) => string {
  const locale = useLocale()
  return useMemo(
    () => (key: string) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
    [locale],
  )
}
