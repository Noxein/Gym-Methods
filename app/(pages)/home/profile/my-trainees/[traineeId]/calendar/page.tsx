import { getTraineeData } from "@/app/actions";
import TraineeCalendar from "@/app/components/profile/my-trainees/calendar/TraineeCalendar";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TraineeCalendarProvider } from "@/app/context/TraineeCalendarContext";
import { getTraineePlans } from "@/app/trainerActions";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const traineeId = (await params).traineeId;
    const traineeData = await getTraineeData(traineeId)
    const traineePlans = await getTraineePlans(traineeId)

    console.log(traineePlans)

    if(!traineeData) return <div className="text-white">Nie można znaleźć danych podopiecznego</div>

    return (
        <TraineeCalendarProvider traineePlans={traineePlans}>
            <ConfirmModalProvider>
                <TraineeCalendar traineeData={traineeData} />
            </ConfirmModalProvider>
        </TraineeCalendarProvider>
    )
}