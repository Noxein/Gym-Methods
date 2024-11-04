import Link from 'next/link'

export const CreateAccountOrLogin = ({hasAccount}:{hasAccount:boolean}) => {
    if(hasAccount) return(
        <div className='text-center text-white'>
            Masz już konto? <Link href={'/login'} className='text-lime-100'>Zaloguj się</Link>
        </div>
    )

  return (
    <div className='text-center text-white'>
        Nie masz jeszcze konta? <Link href={'/register'} className='text-lime-100'>Zarejestruj się</Link>
    </div>
  )
}
