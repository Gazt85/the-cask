import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="font-heading text-2xl font-bold">Página no encontrada</h2>
      <p className="text-sm text-muted-foreground">
        La página que buscás no existe.
      </p>
      <Button render={<Link href="/dashboard" />}>Volver al panel</Button>
    </div>
  )
}
