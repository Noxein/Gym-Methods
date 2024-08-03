import { auth } from '@/auth'
import { LinkBtn, UserEmail } from './LinkBtn'

export const Profile = async () => {
  const session = await auth()
  return (
    <div className='flex flex-col gap-2'>
      <UserEmail email={session?.user?.email!}/>
        <LinkBtn href='/home/profile/set-tempo' text='Ustaw tempo'/>
        <LinkBtn href='/home/profile/search' text='Historia ćwiczeń'/>
        <LinkBtn href='/home/profile/add-new-exercise' text='Dodaj swoje ćwiczenie'/>
        <LinkBtn href='/home/profile/create-training' text='Dodaj plan treningowy'/>
        <LinkBtn href='/home/profile/change-password' text='Zmień hasło'/>
        <LinkBtn href='/logout' text='Wyloguj'/>
    </div>
  )
}

