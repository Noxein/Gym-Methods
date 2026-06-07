import { CalendarIcon, LockIcon, LogoutIcon, PieChartIcon, SettingsIcon } from "@/app/ui/icons/ExpandIcon";
import { LinkBtn, UserEmail } from "./LinkBtn";
import { SignOutBtn } from "./SignOutBtn";
import { useTranslations } from "next-intl";

type ProfileTypes = {
  email: string,
}

function TraineeProfile({ email }: ProfileTypes) {
    const width = '30px'
    const height = '30px'

    const t = useTranslations("Home/Profile")
    return ( 
            <div className='flex flex-col gap-2'>
              <UserEmail email={email}/>
              <div className='mx-5 flex flex-col gap-4 min-h-[calc(100dvh-100px)]'>

                  <LinkBtn href='/home/profile/search'text={t("ExerciseHistory")}>
                    <CalendarIcon width={width} height={height} fill='#fff'/>
                  </LinkBtn>

                  <LinkBtn href='/home/profile/summary' text={t("Summary")}>
                    <PieChartIcon width={width} height={height} fill='#fff'/>
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
     );
}

export default TraineeProfile;
