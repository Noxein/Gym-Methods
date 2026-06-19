
import { CasualProfile } from "@/app/components/profile/CasualProfile";
import TraineeProfile from "@/app/components/profile/TraineeProfile";
import TrainerProfile from "@/app/components/profile/TrainerProfile";
import { MetaDataTranslations } from "@/app/lib/utils";
import { auth } from "@/auth";
  
export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('Profile')
    };
}
export default async function page() {
    const userData = await auth()
    const email = userData?.user?.email! 
    const username = userData?.user?.username!
    const purpose = userData?.user?.purpose!
    const trainercurrentaccounttype = userData?.user?.trainercurrentaccounttype

    if(purpose === 'Casual' || trainercurrentaccounttype === 'Casual') return <CasualProfile purpose={purpose} username={username} trainercurrentaccounttype={trainercurrentaccounttype}/>

    if(purpose === 'Podopieczny trenera') return <TraineeProfile username={username}/>

    return <TrainerProfile username={username} purpose={purpose} trainercurrentaccounttype={trainercurrentaccounttype}/>   
}