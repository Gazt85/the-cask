import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  sealed: 'default',
  open: 'secondary',
  finished: 'outline',
}
