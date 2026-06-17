import { AllExercisesInOneArray, getAllExercises, getTraineeData, userExercisesThatRequireHandlesOrTimeMesure } from "@/app/actions";
import { getTrainerAllHandleTypes, getTrainerCustomExercises } from "@/app/trainerActions";
import CreateTraining from "@/app/components/profile/my-trainees/create/CreateTraining";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TrainingContextProvider } from "@/app/context/CreateTrainingContext";
import { Locale } from "@/app/i18n/config";
import { getLocale, getTranslations } from "next-intl/server";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")

    const traineeId = (await params).traineeId;
    const traineeData = await getTraineeData(traineeId)
    const allHandleTypes = await getTrainerAllHandleTypes()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allExercises = await getAllExercises()
    const { ExercisesThatRequireTimeMesure, ExercisesThatRequireHandle } = await userExercisesThatRequireHandlesOrTimeMesure()
    const customExercises = await getTrainerCustomExercises()
    const locale = await getLocale() as Locale

    if(!traineeData) return <div className="text-white">{t("Trainee data not found")}</div>

    // Merge custom exercises with allExercisesInOneArray
    const customExercisesFormatted = customExercises.map(ex => ({
        id: `custom_${ex.id}`,
        exercisename: ex.exercise_name,
        timemesure: false,
        useshandle: false,
    }))
    const mergedAllExercisesArray = [...allExercisesInOneArray, ...customExercisesFormatted]

    return (
        <TrainingContextProvider locale={locale} userData={traineeData} allHandles={allHandleTypes} allExercisesInOneArray={mergedAllExercisesArray} allExercises={allExercises} exercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure} exercisesThatRequireHandle={ExercisesThatRequireHandle}>
            <ConfirmModalProvider>
                <CreateTraining />
            </ConfirmModalProvider>
        </TrainingContextProvider>
    )
}
