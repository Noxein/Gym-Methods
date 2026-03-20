import { getTraineeData } from "@/app/actions";
import TraineeCalendar from "@/app/components/profile/my-trainees/calendar/TraineeCalendar";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const traineeId = (await params).traineeId;
    const traineeData = await getTraineeData(traineeId)

    if(!traineeData) return <div className="text-white">Nie można znaleźć danych podopiecznego</div>
    return <TraineeCalendar traineeData={traineeData} />

}