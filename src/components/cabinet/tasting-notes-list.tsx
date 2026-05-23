'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { deleteTastingNote } from '@/lib/actions/tasting-notes'
import { useT } from '@/lib/i18n-client'
import type { DbTastingNote } from '@/types/database'

function NoteField({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div>
      <span className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </span>
      <p className="text-sm">{value}</p>
    </div>
  )
}

function TastingNoteItem({ note }: { note: DbTastingNote }) {
  const t = useT()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    const { error } = await deleteTastingNote(note.id)
    setDeleting(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t('toast.note_deleted'))
    }
  }

  const date = new Date(note.tasted_at).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{date}</span>
              {note.score && <Badge variant="secondary">{note.score}/100</Badge>}
            </div>
            <NoteField label={t('tasting.nose')} value={note.nose} />
            <NoteField label={t('tasting.palate')} value={note.palate} />
            <NoteField label={t('tasting.finish')} value={note.finish} />
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function TastingNotesList({ notes }: { notes: DbTastingNote[] }) {
  const t = useT()
  if (notes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t('tasting.empty')}
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <TastingNoteItem key={note.id} note={note} />
      ))}
    </div>
  )
}
