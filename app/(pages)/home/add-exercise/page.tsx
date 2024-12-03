import { AllExercisesInOneArray, getAllExercises } from "@/app/actions";
import { ExerciseListMapped } from "@/app/components/add-exercise/ExerciseListMapped";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Add exercise')
    };
  }

export default async function AddExercisePage(){

    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    return(
        <ExerciseListMapped exercises={exercises} allExercisesInOneArray={allExercisesInOneArray}/>
    )
}