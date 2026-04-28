import { SelectTraining } from "@/app/components/home/start-training/SelectTraining"
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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