import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, getTraineeData, userExercisesThatRequireHandlesOrTimeMesure } from "@/app/actions";
import CreateTraining from "@/app/components/profile/my-trainees/create/CreateTraining";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TrainingContextProvider } from "@/app/context/CreateTrainingContext";
import { Locale } from "@/app/i18n/config";
import { getLocale, getTranslations } from "next-intl/server";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")

    const traineeId = (await params).traineeId;
    const traineeData = await getTraineeData(traineeId)
    const allHandleTypes = await getAllHandleTypes()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allExercises = await getAllExercises()
    const { ExercisesThatRequireTimeMesure, ExercisesThatRequireHandle } = await userExercisesThatRequireHandlesOrTimeMesure()
    const locale = await getLocale() as Locale

    if(!traineeData) return <div className="text-white">{t("Trainee data not found")}</div>

    return (
        <TrainingContextProvider locale={locale} userData={traineeData} allHandles={allHandleTypes} allExercisesInOneArray={allExercisesInOneArray} allExercises={allExercises} exercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure} exercisesThatRequireHandle={ExercisesThatRequireHandle}>
            <ConfirmModalProvider>
                <CreateTraining />
            </ConfirmModalProvider>
        </TrainingContextProvider>
    )
}
