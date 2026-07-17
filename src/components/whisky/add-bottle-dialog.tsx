'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { addBottle } from '@/lib/actions/bottles'
import { useT } from '@/lib/i18n-client'
import type { BottleStatus, DbWhisky } from '@/types/database'

export function AddBottleDialog({
  whisky,
  open,
  onOpenChange,
}: {
  whisky: DbWhisky | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useT()
  const router = useRouter()
  const [status, setStatus] = useState<BottleStatus>('sealed')
  const [quantity, setQuantity] = useState(1)
  const [pricePaid, setPricePaid] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!whisky) return null

  function resetForm() {
    setStatus('sealed')
    setQuantity(1)
    setPricePaid('')
    setNotes('')
  }

  async function handleSubmit(keepAdding: boolean) {
    if (!whisky) return
    setSubmitting(true)

    const { error } = await addBottle({
      whisky_id: whisky.id,
      status,
      quantity,
      price_paid: pricePaid ? parseFloat(pricePaid) : undefined,
      notes: notes || undefined,
    })

    setSubmitting(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success(`${whisky.name} ${t('toast.bottle_added')}`)

    if (keepAdding) {
      resetForm()
      onOpenChange(false)
      return
    }

    onOpenChange(false)
    router.push('/cabinet')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('add_bottle.title')}</DialogTitle>
          <DialogDescription>
            {whisky.name} — {whisky.distillery}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>{t('bottle.status')}</Label>
            <div className="flex gap-2">
              {(['sealed', 'open'] as const).map((s) => (
                <Badge
                  key={s}
                  variant={status === s ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setStatus(s)}
                >
                  {t(`status.${s}`)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">{t('add_bottle.quantity')}</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">{t('add_bottle.price')}</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min={0}
              placeholder="0.00"
              value={pricePaid}
              onChange={(e) => setPricePaid(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('add_bottle.notes')}</Label>
            <Textarea
              id="notes"
              placeholder={t('add_bottle.notes_placeholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            {t('add_bottle.cancel')}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
          >
            {submitting
              ? t('add_bottle.submitting')
              : t('add_bottle.submit_and_keep_adding')}
          </Button>
          <Button onClick={() => handleSubmit(false)} disabled={submitting}>
            {submitting ? t('add_bottle.submitting') : t('add_bottle.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
