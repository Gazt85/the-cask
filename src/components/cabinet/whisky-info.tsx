import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getT } from '@/lib/i18n-server'
import type { DbWhisky } from '@/types/database'

export async function WhiskyInfo({ whisky }: { whisky: DbWhisky }) {
  const t = await getT()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{whisky.name}</CardTitle>
        <p className="text-muted-foreground">{whisky.distillery}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{whisky.country}</Badge>
          {whisky.region && <Badge variant="outline">{whisky.region}</Badge>}
          {whisky.style && <Badge variant="secondary">{whisky.style}</Badge>}
          {whisky.age && (
            <Badge variant="secondary">{whisky.age} {t('bottle.age_suffix')}</Badge>
          )}
          {whisky.abv && (
            <Badge variant="secondary">{whisky.abv}{t('bottle.abv_suffix')}</Badge>
          )}
        </div>
        {whisky.description && (
          <p className="mt-4 text-sm text-muted-foreground">
            {whisky.description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
