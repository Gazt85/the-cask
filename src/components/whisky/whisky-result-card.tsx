'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useT } from '@/lib/i18n-client'
import type { DbWhisky } from '@/types/database'

export function WhiskyResultCard({
  whisky,
  onAdd,
}: {
  whisky: DbWhisky
  onAdd: (whisky: DbWhisky) => void
}) {
  const t = useT()
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">
            {whisky.name}
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAdd(whisky)}
          >
            <Plus className="mr-1 h-3 w-3" />
            {t('search.add')}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{whisky.distillery}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="outline">{whisky.country}</Badge>
          {whisky.style && <Badge variant="secondary">{whisky.style}</Badge>}
          {whisky.age && <span className="text-muted-foreground">{whisky.age} {t('bottle.age_suffix')}</span>}
          {whisky.abv && <span className="text-muted-foreground">{whisky.abv}%</span>}
        </div>
      </CardContent>
    </Card>
  )
}
