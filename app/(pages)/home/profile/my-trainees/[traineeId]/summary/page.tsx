import { getTraineeData } from "@/app/actions";
import { Summary } from "@/app/components/profile/summary/Summary";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Home/Profile/My-Trainees")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    return {
        title: traineeData ? `${traineeData.username} - ${t("TrainingSummary")}` : t("TrainingSummary")
    };
}

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")
    const traineeId = (await params).traineeId
    const traineeData = await getTraineeData(traineeId)

    if(!traineeData) return <div className="text-white">{t("Trainee data not found")}</div>

    return (
        <Summary traineeId={traineeId} />
    )
}
