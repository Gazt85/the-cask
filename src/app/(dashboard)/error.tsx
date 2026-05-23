'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="font-heading text-2xl font-bold">Algo salió mal</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Ocurrió un error inesperado. Intentá de nuevo.
      </p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  )
}
