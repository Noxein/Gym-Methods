import { CasualUserHome } from "@/app/components/home/CasualUserHome";
import TraineeHomeScreen from "@/app/components/home/TraineeHome/TraineeHomeScreen";
import TrainerHomeScreen from "@/app/components/home/TrainerHome/TrainerHomeScreen";
import { MetaDataTranslations } from "@/app/lib/utils";
import { auth } from "@/auth";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('Homepage')
    };
  }

export default async function page(){

      const userData = await auth()
      const email = userData?.user?.email! 
      const purpose = userData?.user?.purpose!
      const trainercurrentaccounttype = userData?.user?.trainercurrentaccounttype
      const name = userData?.user?.username!

    if(!purpose || purpose === 'Casual' || trainercurrentaccounttype === 'Casual') return( 
      <div className="flex flex-col items-center w-full overflow-x-hidden">
            <CasualUserHome useremail={email}/>
        </div>
    )
    
    if(purpose === 'Podopieczny trenera') return(
      <div className="flex flex-col items-center w-full overflow-x-hidden">
        <TraineeHomeScreen name={name}/>
      </div>
    )

    return(
      <div className="flex flex-col items-center w-full overflow-x-hidden">
            <TrainerHomeScreen/>
        </div>
    )
} 