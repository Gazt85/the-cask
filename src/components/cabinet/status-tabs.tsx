'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n-client'
import type { BottleStatus } from '@/types/database'

const tabs: { key: string; value: BottleStatus | undefined }[] = [
  { key: 'status.all', value: undefined },
  { key: 'status.sealed', value: 'sealed' },
  { key: 'status.open', value: 'open' },
  { key: 'status.finished', value: 'finished' },
]

export function StatusTabs() {
  const t = useT()
  const searchParams = useSearchParams()
  const current = searchParams.get('status') as BottleStatus | null

  return (
    <div className="flex gap-1 rounded-lg bg-secondary p-1">
      {tabs.map((tab) => {
        const isActive = tab.value === (current ?? undefined)
        const href = tab.value ? `/cabinet?status=${tab.value}` : '/cabinet'

        return (
          <Link
            key={tab.key}
            href={href}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-amber text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t(tab.key)}
          </Link>
        )
      })}
    </div>
  )
}
