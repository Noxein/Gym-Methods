import { CenterComponent } from "@/app/components/CenterComponent";
import { RegisterForm } from "@/app/components/RegisterForm";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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