import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getT } from '@/lib/i18n-server'

export async function EmptyState() {
  const t = await getT()
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold">{t('cabinet.empty_title')}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {t('cabinet.empty_description')}
      </p>
      <Button className="mt-4" render={<Link href="/search" />}>
        {t('cabinet.empty_cta')}
      </Button>
    </div>
  )
}
