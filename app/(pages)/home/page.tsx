import { getUserPurpose, userEmail } from "@/app/actions";
import { CasualUserHome } from "@/app/components/home/CasualUserHome";
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
    return(
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            <CasualUserHome useremail={useremail}/>
        </div>
    )
} 