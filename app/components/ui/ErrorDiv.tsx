import { cn } from '@/app/lib/cn'
import { useTranslations } from 'next-intl'

interface ErrorDiv extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    error?: string
}
export const ErrorDiv = ({error,className,...rest}:ErrorDiv) => {
    const t = useTranslations('Utils')
    if(!error) return
  return (
    <div className={cn('text-[#db1d1d]',className)} {...rest}>{t('Error')}: {error}</div>
  )
}
