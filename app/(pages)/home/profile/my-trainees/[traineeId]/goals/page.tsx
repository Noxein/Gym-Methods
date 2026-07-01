import { getTraineeData, getTraineeGoalExerciseData, getTraineeGoals } from "@/app/actions";
import { TrainerGoalsPage } from "@/app/components/profile/goals/TrainerGoalsPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    return {
        title: traineeData ? `${traineeData.username} - ${t("Goals")}` : t("Goals")
    }
}

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const u = await getTranslations("Utils")
    const errors = await getTranslations("Errors")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    if(!traineeData) return <div className="text-white">{errors("Trainee data not found")}</div>

    const [goals, exerciseData] = await Promise.all([
        getTraineeGoals(traineeId),
        getTraineeGoalExerciseData(traineeId),
    ])

    return (
        <TrainerGoalsPage
            title={`${traineeData.username} - ${t("Goals")}`}
            traineeId={traineeId}
            emptyMessage={t("NoGoals")}
            exerciseLabel={t("Exercise")}
            goalLabel={t("Goal")}
            addGoalLabel={u("Add")}
            saveLabel={u("Save")}
            selectExerciseLabel={u("AddExercise")}
            goals={goals}
            exercisesObject={exerciseData.exercisesObject}
            allExercisesInOneArray={exerciseData.allExercisesInOneArray}
        />
    )
}