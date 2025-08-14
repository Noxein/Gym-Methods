'use client'
import { useTranslations } from 'next-intl'
import { LinkBtn, UserEmail } from './LinkBtn'
import { SignOutBtn } from './SignOutBtn'
import { BookIcon, CalendarIcon, ExerciseIcon, HandleIcon, LockIcon, LogoutIcon, PieChartIcon, SettingsIcon, SummaryIcon, TimerIcon } from '@/app/ui/icons/ExpandIcon'

type ProfileTypes = {
  email: string
}

export const Profile = ({email}:ProfileTypes) => { 
  const width = '30px'
  const height = '30px'

  const t = useTranslations("Home/Profile")

  const newFeatureExpireDate = new Date(2025,8,6)

  return (
    <div className='flex flex-col gap-2'>
      <UserEmail email={email}/>
      <div className='mx-5 flex flex-col gap-4 min-h-[calc(100dvh-100px)]'>
          <LinkBtn href='/home/profile/set-tempo' text={t("SetTempo")}>
            <TimerIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/search' text={t("ExerciseHistory")}>
            <CalendarIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/my-exercises' text={t("MyExercises")}>
            <ExerciseIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/long-term-plans' text={t("MyTrainings")} isNewFeature={new Date().getTime()<newFeatureExpireDate.getTime()}>
            <BookIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/my-handles' text={t("MyHandles")}>
            <HandleIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/summary' text={t("Summary")}>
            <PieChartIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/set-progressions' text={t("SetProgressions")}>
            <SummaryIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <LinkBtn href='/home/profile/settings' text={t("AccountSettings")}>
            <SettingsIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>


          <LinkBtn href='/home/profile/change-password' text={t("ChangePassword")} sClass='mt-auto'>
            <LockIcon width={width} height={height} fill='#fff'/>
          </LinkBtn>
          <SignOutBtn>
            <LogoutIcon width={width} height={height} fill='#fff'/>
          </SignOutBtn>
      </div>
        
    </div>
  )
}

