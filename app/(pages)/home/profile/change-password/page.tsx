import { ChangePasswordPage } from "@/app/components/home/change-password/ChangePasswordPage"
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('Change password')
    };
  }
  
export default function page(){
    return(
        <ChangePasswordPage />
    )
}
 