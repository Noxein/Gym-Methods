import { AllExercisesInOneArray, getAllExercises, getTraineeData } from "@/app/actions";
import TraineeInfo from "@/app/components/profile/my-trainees/calendar/TraineeInfo";
import { SearchPage } from "@/app/components/profile/search/SearchPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    return {
        title: traineeData ? `${traineeData.username} - ${t("TrainingHistory")}` : t("TrainingHistory")
    };
}

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()

    if(!traineeData) return <div className="text-white">{t("Trainee data not found")}</div>

    return (
        <SearchPage exerciseList={allExercisesInOneArray} exercises={exercises} traineeId={traineeId}>
            <div className="bg-darkLight rounded-lg p-5">
                <TraineeInfo info={traineeData} />
            </div>
        </SearchPage>
    )
}
