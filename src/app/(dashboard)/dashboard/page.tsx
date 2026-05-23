import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getDashboardStats, getCollectionValue } from '@/lib/actions/bottles'
import { getProfile } from '@/lib/actions/profile'
import { CollectionValueCard } from '@/components/dashboard/collection-value-card'
import { statusVariant } from '@/lib/utils'
import { getT } from '@/lib/i18n-server'

function relativeDate(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
  if (diff === 0) return 'hoy'
  if (diff === 1) return 'ayer'
  if (diff < 7) return `hace ${diff} días`
  if (diff < 30) return `hace ${Math.floor(diff / 7)} sem.`
  if (diff < 365) return `hace ${Math.floor(diff / 30)} meses`
  return `hace ${Math.floor(diff / 365)} años`
}

export default async function DashboardPage() {
  const t = await getT()
  const [statsResult, profileResult, valueResult] = await Promise.all([
    getDashboardStats(),
    getProfile(),
    getCollectionValue(),
  ])

  const stats = statsResult.data
  const valueStats = valueResult.data
  const displayName = profileResult.data?.display_name ?? profileResult.data?.username

  if (!stats) {
    return (
      <p className="text-sm text-destructive">
        {statsResult.error?.message ?? 'Error al cargar el panel.'}
      </p>
    )
  }

  const isEmpty = stats.counts.total === 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.welcome')}{displayName ? `, ${displayName}` : ''}.
        </p>
      </div>

      {isEmpty ? (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-muted-foreground">{t('dashboard.no_bottles')}</p>
          <Button size="sm" render={<Link href="/search" />}>
            <Plus className="mr-1 h-4 w-4" />
            {t('dashboard.go_to_search')}
          </Button>
        </Card>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('dashboard.total')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-4xl font-bold">{stats.counts.total}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('status.sealed')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-4xl font-bold">{stats.counts.sealed}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('status.open')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-4xl font-bold">{stats.counts.open}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('status.finished')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-4xl font-bold">{stats.counts.finished}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('dashboard.avg_rating')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-4xl font-bold text-amber">
                  {stats.avgRating ?? t('dashboard.no_rating')}
                </span>
              </CardContent>
            </Card>

            <CollectionValueCard
              totalValue={valueStats?.totalValue ?? 0}
              bottlesWithPrice={valueStats?.bottlesWithPrice ?? 0}
              totalBottles={valueStats?.totalBottles ?? 0}
            />
          </div>

          {/* Recent activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent tasting notes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{t('dashboard.recent_notes')}</CardTitle>
                <Link
                  href="/cabinet"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {t('dashboard.view_cabinet')}
                </Link>
              </CardHeader>
              <CardContent>
                {stats.recentNotes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t('dashboard.no_notes')}</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {stats.recentNotes.map((note) => (
                      <li key={note.id}>
                        <Link
                          href={`/cabinet/${note.bottle_id}`}
                          className="flex items-center justify-between gap-2 py-2.5 hover:text-foreground/80"
                        >
                          <span className="truncate text-sm font-medium">
                            {note.whisky_name}
                          </span>
                          <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                            {note.score != null && (
                              <span className="font-medium text-amber">{note.score}/100</span>
                            )}
                            {relativeDate(note.tasted_at)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Recently added bottles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{t('dashboard.recent_bottles')}</CardTitle>
                <Link
                  href="/cabinet"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {t('dashboard.view_cabinet')}
                </Link>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {stats.recentBottles.map((bottle) => (
                    <li key={bottle.id}>
                      <Link
                        href={`/cabinet/${bottle.id}`}
                        className="flex items-center justify-between gap-2 py-2.5 hover:text-foreground/80"
                      >
                        <span className="truncate text-sm font-medium">
                          {bottle.whisky.name}
                        </span>
                        <Badge variant={statusVariant[bottle.status]} className="shrink-0 text-xs">
                          {t(`status.${bottle.status}`)}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
