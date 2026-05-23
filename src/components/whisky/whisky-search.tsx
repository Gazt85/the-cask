'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { searchWhiskies } from '@/lib/actions/whiskies'
import { WhiskyResultCard } from './whisky-result-card'
import { AddBottleDialog } from './add-bottle-dialog'
import { useT } from '@/lib/i18n-client'
import type { DbWhisky } from '@/types/database'

export function WhiskySearch() {
  const t = useT()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DbWhisky[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [selectedWhisky, setSelectedWhisky] = useState<DbWhisky | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true)
      const { data } = await searchWhiskies({ query: query.trim() })
      setResults(data ?? [])
      setSearched(true)
      setLoading(false)
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  function handleAdd(whisky: DbWhisky) {
    setSelectedWhisky(whisky)
    setDialogOpen(true)
  }

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">{t('search.loading')}</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {t('search.no_results')} &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((whisky) => (
            <WhiskyResultCard
              key={whisky.id}
              whisky={whisky}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}

      <AddBottleDialog
        whisky={selectedWhisky}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
