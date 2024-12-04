import { CenterComponent } from "@/app/components/CenterComponent";
import { LoginForm } from "@/app/components/LoginForm";
import { getLocale, getTranslations } from "next-intl/server";

  export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Login'),
      description: t('Login description')
    };
  }
export default function Login(){
    return(
        <CenterComponent>
            <LoginForm />
        </CenterComponent>
    )
}