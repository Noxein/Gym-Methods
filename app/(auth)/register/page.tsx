import { CenterComponent } from "@/app/components/CenterComponent";
import { RegisterForm } from "@/app/components/RegisterForm";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Register'),
    };
  }
  
export default function Register(){
    return(
        <CenterComponent>
            <RegisterForm />
        </CenterComponent>
    )
}