import { getUserHandles } from "@/app/actions";
import { MyHandles } from "@/app/components/profile/my-handles/MyHandles";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Handles')
    };
  }
  
export default async function page(){
    const handles = await getUserHandles()
    return(
        <MyHandles handles={handles}/>
    )
} 