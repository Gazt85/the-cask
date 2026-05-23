'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addTastingNote } from '@/lib/actions/tasting-notes'
import { useT } from '@/lib/i18n-client'

export function AddTastingNoteForm({ bottleId }: { bottleId: string }) {
  const t = useT()
  const [nose, setNose] = useState('')
  const [palate, setPalate] = useState('')
  const [finish, setFinish] = useState('')
  const [score, setScore] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const scoreValue = score ? parseInt(score) : undefined
    if (scoreValue !== undefined && (scoreValue < 1 || scoreValue > 100)) {
      toast.error(t('toast.score_error'))
      return
    }

    setSubmitting(true)
    const { error } = await addTastingNote({
      bottle_id: bottleId,
      nose: nose || undefined,
      palate: palate || undefined,
      finish: finish || undefined,
      score: scoreValue,
    })
    setSubmitting(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success(t('toast.note_added'))
    setNose('')
    setPalate('')
    setFinish('')
    setScore('')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{t('tasting.add_title')}</CardTitle>
          <Link href="/guide" className="text-xs text-amber hover:underline">
            {t('tasting.how_to_taste')}
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="nose">{t('tasting.nose')}</Label>
            <Textarea
              id="nose"
              placeholder={t('tasting.nose_placeholder')}
              value={nose}
              onChange={(e) => setNose(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="palate">{t('tasting.palate')}</Label>
            <Textarea
              id="palate"
              placeholder={t('tasting.palate_placeholder')}
              value={palate}
              onChange={(e) => setPalate(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="finish">{t('tasting.finish')}</Label>
            <Textarea
              id="finish"
              placeholder={t('tasting.finish_placeholder')}
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="score">{t('tasting.score')}</Label>
            <Input
              id="score"
              type="number"
              min={1}
              max={100}
              placeholder="—"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-24"
            />
          </div>
          <Button type="submit" size="sm" disabled={submitting}>
            {submitting ? t('tasting.saving') : t('tasting.save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
