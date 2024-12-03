import { SelectTraining } from "@/app/components/home/start-training/SelectTraining"
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Start training')
    };
  }

export default async function page(){
    
    return(
        <main className="text-white">
            <SelectTraining />
        </main>
    )
}