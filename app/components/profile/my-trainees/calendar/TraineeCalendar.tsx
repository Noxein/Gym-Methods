import { Trainee } from "@/app/types";
import TraineeInfo from "./TraineeInfo";
import Calendar from "./Calendar";
import Trainings from "./Trainings";
import Schedule from "./Schedule";

type TraineeCalendarProps = {
    traineeData: Trainee
}
function TraineeCalendar({ traineeData }: TraineeCalendarProps) {
    return ( 
        <div className="mb-44">
            <TraineeInfo info={traineeData}/>

            <Schedule />
        </div>
     );
}

export default TraineeCalendar;