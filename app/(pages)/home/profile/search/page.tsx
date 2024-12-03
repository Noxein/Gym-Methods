import { AllExercisesInOneArray, getAllExercises } from "@/app/actions";
import { SearchPage } from "@/app/components/profile/search/SearchPage";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('History')
    };
  }

export default async function page(){
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    
    return <SearchPage exerciseList={allExercisesInOneArray} exercises={exercises}/>
}