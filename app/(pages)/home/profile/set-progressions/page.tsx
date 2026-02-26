import { AllExercisesInOneArray, getAllExercises, getAllUserProgressions } from "@/app/actions";
import { SetProgressions } from "@/app/components/profile/set-progressions/SetProgressions";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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