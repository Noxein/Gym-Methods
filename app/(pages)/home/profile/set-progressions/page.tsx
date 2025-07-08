import { AllExercisesInOneArray, getAllExercises, getAllUserProgressions } from "@/app/actions";
import { SetProgressions } from "@/app/components/profile/set-progressions/SetProgressions";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Progressions')
    };
  }

export default async function page(){
        const exercises = await getAllExercises()
        const progressions = await getAllUserProgressions()
        const allExercisesInOneArray = await AllExercisesInOneArray()
  
    return <SetProgressions allExercisesInOneArray={allExercisesInOneArray} exercises={exercises} progressions={progressions}/>
}