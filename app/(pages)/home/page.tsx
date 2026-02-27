import { getUserPurpose, userEmail } from "@/app/actions";
import { CasualUserHome } from "@/app/components/home/CasualUserHome";
import TraineeHomeScreen from "@/app/components/home/TraineeHome/TraineeHomeScreen";
import TrainerHomeScreen from "@/app/components/home/TrainerHome/TrainerHomeScreen";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('Homepage')
    };
  }

export default async function page(){
    const useremail = await userEmail()
    const userPurpose = await getUserPurpose()

    if(!userPurpose || userPurpose === 'Casual') return( 
      <div className="flex flex-col items-center w-full overflow-x-hidden">
            <CasualUserHome useremail={useremail}/>
        </div>
    )
    
    if(userPurpose === 'Podopieczny trenera') return(
      <div className="flex flex-col items-center w-full overflow-x-hidden">
        <TraineeHomeScreen/>
      </div>
    )

    return(
      <div className="flex flex-col items-center w-full overflow-x-hidden">
            <TrainerHomeScreen/>
        </div>
    )
} 