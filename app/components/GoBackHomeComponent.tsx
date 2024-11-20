import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const GoBackHomeComponent = ({children}:{children:React.ReactNode}) => {
  const t = useTranslations('Home/Add-Exercise/[Exercise-Name]')
  return (
    <div className='flex flex-col items-center'>
        <div>{children}</div>
        <div>
            <Link href={'/home'} className='text-blue-500 text-xl px-6 py-2'>{t("GoBackHome")}</Link>
        </div>
    </div>
  )
}
