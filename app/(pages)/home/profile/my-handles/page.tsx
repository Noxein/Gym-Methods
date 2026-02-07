import { getUserHandles } from "@/app/actions";
import { MyHandles } from "@/app/components/profile/my-handles/MyHandles";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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