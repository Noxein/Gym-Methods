import { userEmail } from "@/app/actions";
import { Home } from "@/app/components/home/Home";
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
    return(
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            <Home useremail={useremail}/>
        </div>
    )
} 