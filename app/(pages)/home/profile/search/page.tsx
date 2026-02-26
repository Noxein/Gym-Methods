import { AllExercisesInOneArray, getAllExercises } from "@/app/actions";
import { SearchPage } from "@/app/components/profile/search/SearchPage";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('History')
    };
  }

export default async function page(){
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    
    return <SearchPage exerciseList={allExercisesInOneArray} exercises={exercises}/>
}