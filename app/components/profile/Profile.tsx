import { auth, signOut } from '@/auth'
import { LinkBtn, UserEmail } from './LinkBtn'
import { SignOutBtn } from './SignOutBtn'
import { BookIcon, CalendarIcon, ExerciseIcon, LockIcon, LogoutIcon, StarIcon, SummaryIcon, TimerIcon } from '@/app/ui/icons/ExpandIcon'

export const Profile = async () => {
  const session = await auth()
  const width = '30px'
  const height = '30px'
  return (
    <div className='flex flex-col gap-2'>
      <UserEmail email={session?.user?.email!}/>
      <div className='mx-5 flex flex-col gap-4 min-h-[calc(100dvh-100px)]'>
          <LinkBtn href='/home/profile/set-tempo' text='Ustaw tempo'>
            <TimerIcon width={width} height={height}/>
          </LinkBtn>
          <LinkBtn href='/home/profile/search' text='Historia ćwiczeń'>
            <CalendarIcon width={width} height={height}/>
          </LinkBtn>
          <LinkBtn href='/home/profile/my-exercises' text='Moje ćwiczenia'>
            <ExerciseIcon width={width} height={height}/>
          </LinkBtn>
          <LinkBtn href='/home/profile/my-training-plans' text='Moje treningi'>
            <BookIcon width={width} height={height} />
          </LinkBtn>
          <LinkBtn href='/home/profile' text='Podsumowanie'>
            <SummaryIcon width={width} height={height}/>
          </LinkBtn>
          <LinkBtn href='/home/profile' text='Ulubione ćwiczenia'>
            <StarIcon width={width} height={height}/>
          </LinkBtn>


          <LinkBtn href='/home/profile/change-password' text='Zmień hasło' sClass='mt-auto'>
            <LockIcon width={width} height={height}/>
          </LinkBtn>
          <SignOutBtn>
            <LogoutIcon width={width} height={height}/>
          </SignOutBtn>
      </div>
        
    </div>
  )
}

