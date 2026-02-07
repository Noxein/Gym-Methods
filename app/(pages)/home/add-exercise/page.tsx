import { AllExercisesInOneArray, getAllExercises } from "@/app/actions";
import { ExerciseListMapped } from "@/app/components/add-exercise/ExerciseListMapped";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
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