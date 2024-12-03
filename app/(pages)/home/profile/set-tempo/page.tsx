import { AllExercisesInOneArray, getAllExercises, getAllTempos } from "@/app/actions";
import { SetTempo } from "@/app/components/profile/set-tempo/SetTempo";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const locale = getLocale()
    const t = await getTranslations({locale, namespace: 'Metadata'});
   
    return {
      title: t('Tempo')
    };
  }

export default async function page(){
    const exercises = await getAllExercises()
    const tempos = await getAllTempos()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    return(
        <SetTempo exercises={exercises} tempos={tempos} allExercisesInOneArray={allExercisesInOneArray}/>
    )
}