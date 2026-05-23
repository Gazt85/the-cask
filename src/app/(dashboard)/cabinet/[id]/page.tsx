import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { getBottle } from '@/lib/actions/bottles'
import { WhiskyInfo } from '@/components/cabinet/whisky-info'
import { BottleControls } from '@/components/cabinet/bottle-controls'
import { AddTastingNoteForm } from '@/components/cabinet/add-tasting-note-form'
import { TastingNotesList } from '@/components/cabinet/tasting-notes-list'
import { getT } from '@/lib/i18n-server'

export default async function BottleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getT()
  const { id } = await params
  const { data: bottle, error } = await getBottle(id)

  if (error || !bottle) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/cabinet"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        {t('cabinet.back')}
      </Link>

      <WhiskyInfo whisky={bottle.whisky} />

      <Separator />

      <section>
        <h2 className="mb-3 text-lg font-semibold">{t('bottle.details')}</h2>
        <BottleControls bottle={bottle} />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t('tasting.title')}</h2>
        <AddTastingNoteForm bottleId={bottle.id} />
        <TastingNotesList notes={bottle.tasting_notes} />
      </section>
    </div>
  )
}
