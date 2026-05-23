import { WhiskySearch } from '@/components/whisky/whisky-search'
import { getT } from '@/lib/i18n-server'

export default async function SearchPage() {
  const t = await getT()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">{t('search.title')}</h1>
        <p className="text-muted-foreground">
          {t('search.subtitle')}
        </p>
      </div>
      <WhiskySearch />
    </div>
  )
}
