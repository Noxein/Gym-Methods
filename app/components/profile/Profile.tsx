import { auth, signOut } from '@/auth'
import { LinkBtn, UserEmail } from './LinkBtn'
import { SignOutBtn } from './SignOutBtn'

export const Profile = async () => {
  const session = await auth()
  return (
    <div className='flex flex-col gap-2'>
      <UserEmail email={session?.user?.email!}/>
        <LinkBtn href='/home/profile/set-tempo' text='Ustaw tempo'/>
        <LinkBtn href='/home/profile/search' text='Historia ćwiczeń'/>
        <LinkBtn href='/home/profile/my-exercises' text='Moje ćwiczenia'/>
        <LinkBtn href='/home/profile/create-training' text='Dodaj plan treningowy'/>
        <LinkBtn href='/home/profile/change-password' text='Zmień hasło'/>
        <SignOutBtn />
    </div>
  )
}

