import { ChangePasswordPage } from "@/app/components/home/change-password/ChangePasswordPage"
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Change password')
    };
  }
  
export default function page(){
    return(
        <ChangePasswordPage />
    )
}
 