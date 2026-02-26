import { CenterComponent } from "@/app/components/CenterComponent";
import { LoginForm } from "@/app/components/LoginForm";
import { MetaDataTranslations } from "@/app/lib/utils";

  export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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