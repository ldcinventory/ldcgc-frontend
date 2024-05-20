import { toast } from "sonner"

export const handleCopyText = (value: string) => async () => {
  await navigator.clipboard.writeText(value)
  toast.info('Texto copiado al portapapeles!')
}