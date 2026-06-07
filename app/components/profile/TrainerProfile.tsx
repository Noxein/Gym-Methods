import { CalendarIcon, ExerciseIcon, HandleIcon, LockIcon, LogoutIcon, PieChartIcon, PlanIcon, SettingsIcon, UsersIcon } from "@/app/ui/icons/ExpandIcon";
import { LinkBtn, UserEmail } from "./LinkBtn";
import { useTranslations } from "next-intl";
import { SignOutBtn } from "./SignOutBtn";
import SwitchProfileButton from "./SwitchProfileButton";
import { UserPurposeType } from "@/app/types";

type ProfileTypes = {
    email: string,
    purpose: UserPurposeType
    trainercurrentaccounttype?: string | null
}

function TrainerProfile({email, purpose, trainercurrentaccounttype}:ProfileTypes) {
  const width = '30px'
  const height = '30px'

  const t = useTranslations("Home/Profile")
  return ( 
    <div className='flex flex-col gap-2'>
      <UserEmail email={email}/>
      <div className='mx-5 flex flex-col gap-4 min-h-[calc(100dvh-100px)]'>
        <SwitchProfileButton text={t("CasualAccount")} purpose={purpose} trainercurrentaccounttype={trainercurrentaccounttype}>
          <ExerciseIcon width={width} height={height} fill='#fff'/>
        </SwitchProfileButton>

        <LinkBtn text={t("TrainingSchemas")} href="/home/profile/my-trainees/schemas">
          <PlanIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href='/home/profile/search' text={t("ExerciseHistory")}>
          <CalendarIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href='/home/profile/my-exercises' text={t("Exercises")}>
          <ExerciseIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href='/home/profile/my-handles' text={t("Handles")}>
          <HandleIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href='/home/profile/summary' text={t("Summary")}>
          <PieChartIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href='/home/profile/settings' text={t("AccountSettings")}>
          <SettingsIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>

        <LinkBtn href="/home/profile/my-trainees" text={t("MyTrainees")}>
          <UsersIcon width={width} height={height} fill='#fff'/>
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

export default TrainerProfile;
