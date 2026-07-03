import { AllExercisesInOneArray, getAllExercises, getUserGoals } from "@/app/actions";
import { SelfGoalsPage } from "@/app/components/profile/goals/SelfGoalsPage";
import { MetaDataTranslations } from "@/app/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await MetaDataTranslations()

    return {
        title: t("Goals")
    }
}

export default async function page() {
    const t = await getTranslations("Home/Profile")
    const u = await getTranslations("Utils")
    const goals = await getUserGoals()
    const exercisesObject = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()

    return (
        <SelfGoalsPage
            title={t("Goals")}
            emptyMessage={t("NoGoals")}
            exerciseLabel={t("Exercise")}
            goalLabel={t("Goal")}
            addGoalLabel={u("Add")}
            saveLabel={u("Save")}
            deleteLabel={u("Delete")}
            selectExerciseLabel={u("AddExercise")}
            goals={goals}
            exercisesObject={exercisesObject}
            allExercisesInOneArray={allExercisesInOneArray}
        />
    )
}