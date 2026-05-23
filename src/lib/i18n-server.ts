import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, dictionaries, isLocale, type Locale } from './i18n'

export const LOCALE_COOKIE = 'locale'

// Read the active locale for the current request from the cookie.
// Falls back to DEFAULT_LOCALE outside a request context (e.g. static generation).
export async function getServerLocale(): Promise<Locale> {
  try {
    const store = await cookies()
    const value = store.get(LOCALE_COOKIE)?.value
    if (isLocale(value)) return value
  } catch {
    // No request context available — fall through to default.
  }
  return DEFAULT_LOCALE
}

// Returns a translator bound to the current request's locale.
// Usage:  const t = await getT()
//         <h1>{t('cabinet.title')}</h1>
export async function getT(): Promise<(key: string) => string> {
  const locale = await getServerLocale()
  return (key: string) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key
}
