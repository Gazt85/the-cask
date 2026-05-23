'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useT } from '@/lib/i18n-client'

interface Props {
  totalValue: number
  bottlesWithPrice: number
  totalBottles: number
}

export function CollectionValueCard({ totalValue, bottlesWithPrice, totalBottles }: Props) {
  const t = useT()
  const [visible, setVisible] = useState(true)
  const hasData = bottlesWithPrice > 0

  return (
    <div className="col-span-2 sm:col-span-1">
      <Card className="h-full border-border/50 transition-all hover:border-amber/30">
        <CardHeader className="pb-1 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t('dashboard.collection_value')}
            </CardTitle>
            {hasData && (
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={visible ? 'Hide value' : 'Show value'}
              >
                {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          {hasData ? (
            <Link href="/dashboard/collection-value">
              <span className="font-heading text-4xl font-bold text-amber">
                {visible ? `$${totalValue.toLocaleString()}` : '••••••'}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('value.based_on')
                  .replace('{0}', String(bottlesWithPrice))
                  .replace('{1}', String(totalBottles))}
              </p>
            </Link>
          ) : (
            <Link href="/dashboard/collection-value">
              <span className="font-heading text-4xl font-bold text-muted-foreground">—</span>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
