import { getUserPurpose, userEmail } from "@/app/actions";
import { CasualUserHome } from "@/app/components/home/CasualUserHome";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
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