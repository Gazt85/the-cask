'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isLocale, type Locale } from '@/lib/i18n'
import { LOCALE_COOKIE } from '@/lib/i18n-server'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export async function setLocale(locale: Locale): Promise<void> {
  if (!isLocale(locale)) return
  const store = await cookies()
  store.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: ONE_YEAR_SECONDS,
    sameSite: 'lax',
  })
  revalidatePath('/', 'layout')
}
