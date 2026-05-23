'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { updateBottle, deleteBottle } from '@/lib/actions/bottles'
import { useT } from '@/lib/i18n-client'
import type { BottleStatus, DbCollectionBottle } from '@/types/database'

const allStatuses: { value: BottleStatus; key: string }[] = [
  { value: 'sealed', key: 'status.sealed' },
  { value: 'open', key: 'status.open' },
  { value: 'finished', key: 'status.finished' },
]

export function BottleControls({
  bottle,
}: {
  bottle: DbCollectionBottle
}) {
  const t = useT()
  const router = useRouter()
  const [status, setStatus] = useState(bottle.status)
  const [rating, setRating] = useState(bottle.rating?.toString() ?? '')
  const [pricePaid, setPricePaid] = useState(bottle.price_paid?.toString() ?? '')
  const [notes, setNotes] = useState(bottle.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleStatusChange(newStatus: BottleStatus) {
    if (newStatus === status) return
    setStatus(newStatus)
    setSaving(true)
    const { error } = await updateBottle(bottle.id, { status: newStatus })
    setSaving(false)
    if (error) {
      toast.error(error.message)
      setStatus(bottle.status)
    } else {
      toast.success(`${t('toast.status_updated')} ${t(`status.${newStatus}`).toLowerCase()}`)
    }
  }

  async function handleRatingSave() {
    const value = rating ? parseInt(rating) : null
    if (value !== null && (value < 1 || value > 100)) {
      toast.error(t('toast.rating_error'))
      return
    }
    setSaving(true)
    const { error } = await updateBottle(bottle.id, {
      rating: value ?? undefined,
    })
    setSaving(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t('toast.rating_saved'))
    }
  }

  async function handlePriceSave() {
    const value = pricePaid ? parseFloat(pricePaid) : null
    setSaving(true)
    const { error } = await updateBottle(bottle.id, {
      price_paid: value ?? undefined,
    })
    setSaving(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t('toast.price_saved'))
    }
  }

  async function handleNotesSave() {
    setSaving(true)
    const { error } = await updateBottle(bottle.id, {
      notes: notes || undefined,
    })
    setSaving(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t('toast.notes_saved'))
    }
  }

  async function handleDelete() {
    setDeleting(true)
    const { error } = await deleteBottle(bottle.id)
    setDeleting(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t('toast.bottle_removed'))
      router.push('/cabinet')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('bottle.status')}</Label>
        <div className="flex gap-2">
          {allStatuses.map((s) => (
            <Badge
              key={s.value}
              variant={status === s.value ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusChange(s.value)}
            >
              {saving ? '...' : t(s.key)}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-end gap-2">
          <div className="space-y-2">
            <Label htmlFor="rating">{t('bottle.rating')}</Label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={100}
              placeholder="—"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-24"
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRatingSave}
            disabled={saving}
          >
            {t('bottle.save')}
          </Button>
        </div>

        <div className="flex items-end gap-2">
          <div className="space-y-2">
            <Label htmlFor="price">{t('bottle.price_paid')}</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min={0}
              placeholder="0.00"
              value={pricePaid}
              onChange={(e) => setPricePaid(e.target.value)}
              className="w-28"
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePriceSave}
            disabled={saving}
          >
            {t('bottle.save')}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bottle-notes">{t('bottle.notes')}</Label>
        <Textarea
          id="bottle-notes"
          placeholder={t('bottle.notes_placeholder')}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={handleNotesSave}
          disabled={saving}
        >
          {t('bottle.save_notes')}
        </Button>
      </div>

      <div className="pt-4">
        <Dialog>
          <DialogTrigger
            render={<Button variant="destructive" size="sm" />}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            {t('bottle.delete')}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('bottle.delete_title')}</DialogTitle>
              <DialogDescription>
                {t('bottle.delete_description')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" disabled={deleting} />}>
                {t('bottle.cancel')}
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? t('bottle.deleting') : t('common.delete')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
