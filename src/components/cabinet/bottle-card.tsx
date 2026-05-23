import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { statusVariant } from '@/lib/utils'
import { getT } from '@/lib/i18n-server'
import type { CollectionBottle } from '@/types/database'

export async function BottleCard({ bottle }: { bottle: CollectionBottle }) {
  const t = await getT()
  return (
    <Link href={`/cabinet/${bottle.id}`}>
      <Card className="h-full border-border/50 transition-all hover:border-amber/30">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-heading text-base leading-tight">
              {bottle.whisky.name}
            </CardTitle>
            <Badge variant={statusVariant[bottle.status]}>
              {t(`status.${bottle.status}`)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {bottle.whisky.distillery}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {bottle.whisky.country && <span>{bottle.whisky.country}</span>}
            {bottle.whisky.age && <span>{bottle.whisky.age}yo</span>}
            {bottle.rating && (
              <span className="font-medium text-amber">
                {bottle.rating}/100
              </span>
            )}
            {bottle.price_paid && (
              <span>${bottle.price_paid}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
