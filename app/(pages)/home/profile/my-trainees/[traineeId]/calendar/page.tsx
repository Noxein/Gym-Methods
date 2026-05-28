import { getTraineeData } from "@/app/actions";
import TraineeCalendar from "@/app/components/profile/my-trainees/calendar/TraineeCalendar";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TraineeCalendarProvider } from "@/app/context/TraineeCalendarContext";
import { getTraineePlans } from "@/app/trainerActions";
import { getTranslations } from "next-intl/server";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")

    const traineeId = (await params).traineeId;
    const traineeData = await getTraineeData(traineeId)
    const traineePlans = await getTraineePlans(traineeId)

    console.log(traineePlans)

    if(!traineeData) return <div className="text-white">{t("Trainee data not found")}</div>

    return (
        <TraineeCalendarProvider traineePlans={traineePlans}>
            <ConfirmModalProvider>
                <TraineeCalendar traineeData={traineeData} />
            </ConfirmModalProvider>
        </TraineeCalendarProvider>
    )
}
