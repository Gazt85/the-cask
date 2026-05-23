import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBottles } from '@/lib/actions/bottles'
import { StatusTabs } from '@/components/cabinet/status-tabs'
import { BottleCard } from '@/components/cabinet/bottle-card'
import { EmptyState } from '@/components/cabinet/empty-state'
import { getT } from '@/lib/i18n-server'
import type { BottleStatus } from '@/types/database'

const validStatuses: BottleStatus[] = ['sealed', 'open', 'finished']

export default async function CabinetPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const t = await getT()
  const { status } = await searchParams
  const filterStatus = validStatuses.includes(status as BottleStatus)
    ? (status as BottleStatus)
    : undefined

  const { data: bottles, error } = await getBottles(filterStatus)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">{t('cabinet.title')}</h1>
          <p className="text-muted-foreground">{t('cabinet.subtitle')}</p>
        </div>
        <Button size="sm" render={<Link href="/search" />}>
          <Plus className="mr-1 h-4 w-4" />
          {t('cabinet.add_bottle')}
        </Button>
      </div>

      <StatusTabs />

      {error ? (
        <p className="text-sm text-destructive">
          {t('cabinet.load_error')}: {error.message}
        </p>
      ) : !bottles || bottles.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bottles.map((bottle) => (
            <BottleCard key={bottle.id} bottle={bottle} />
          ))}
        </div>
      )}
    </div>
  )
}
