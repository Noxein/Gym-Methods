import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const CreateAccountOrLogin = ({hasAccount}:{hasAccount:boolean}) => {

  const t = useTranslations("Login")

    if(hasAccount) return(
      <div className='text-center text-white'>
        {t("GotAccount")} <Link href={'/login'} className='text-lime-100'> {t("LoginYourself")} </Link>
      </div>
    )

  return (
    <div className='text-center text-white'>
        {t("DontHaveAccount")} <Link href={'/register'} className='text-lime-100'>{t("Register")}</Link>
    </div>
  )
}
