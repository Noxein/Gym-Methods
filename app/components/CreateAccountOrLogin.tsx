import Link from 'next/link'
import React from 'react'

export const CreateAccountOrLogin = ({hasAccount}:{hasAccount:boolean}) => {
    if(hasAccount) return(
        <div>
            Masz już konto? <Link href={'/login'}>Zaloguj się</Link>
        </div>
    )

  return (
    <div>
        Nie masz jeszcze konta? <Link href={'/register'}>Zarejestruj się</Link>
    </div>
  )
}
