import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCollectionValue } from '@/lib/actions/bottles'
import { statusVariant } from '@/lib/utils'
import { getT } from '@/lib/i18n-server'

export default async function CollectionValuePage() {
  const t = await getT()
  const { data: stats, error } = await getCollectionValue()

  if (!stats) {
    return (
      <p className="text-sm text-destructive">
        {error?.message ?? 'Error al cargar el valor de la colección.'}
      </p>
    )
  }

  const hasData = stats.bottlesWithPrice > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('value.back')}
        </Link>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {t('value.title')}
        </h1>
        {hasData && (
          <p className="text-muted-foreground">
            {t('value.based_on')
              .replace('{0}', String(stats.bottlesWithPrice))
              .replace('{1}', String(stats.totalBottles))}
          </p>
        )}
      </div>

      {!hasData ? (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-muted-foreground">{t('value.no_prices')}</p>
        </Card>
      ) : (
        <>
          {/* Total value */}
          <Card>
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('value.total')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <span className="font-heading text-5xl font-bold text-amber">
                ${stats.totalValue.toLocaleString()}
              </span>
            </CardContent>
          </Card>

          {/* Breakdown by status */}
          <div>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {t('value.by_status')}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(['sealed', 'open', 'finished'] as const).map((status) => (
                <Card key={status}>
                  <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t(`status.${status}`)}
                    </CardTitle>
                    <Badge variant={statusVariant[status]} className="text-xs">
                      {t(`status.${status}`)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <span className="font-heading text-3xl font-bold">
                      ${stats.byStatus[status].toLocaleString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Average + Most expensive */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t('value.avg_price')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <span className="font-heading text-3xl font-bold">
                  ${stats.avgBottlePrice?.toLocaleString() ?? '—'}
                </span>
              </CardContent>
            </Card>

            {stats.mostExpensive && (
              <Link href={`/cabinet/${stats.mostExpensive.id}`}>
                <Card className="h-full border-border/50 transition-all hover:border-amber/30">
                  <CardHeader className="pb-1 pt-4">
                    <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t('value.most_expensive')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <span className="font-heading text-3xl font-bold text-amber">
                      ${stats.mostExpensive.pricePaid.toLocaleString()}
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stats.mostExpensive.whiskyName}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
