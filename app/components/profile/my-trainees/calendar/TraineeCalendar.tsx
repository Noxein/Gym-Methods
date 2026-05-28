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
            <div className='mx-5 mt-5'>
                <TraineeInfo info={traineeData}/>

            </div>

            <Schedule />
        </div>
     );
}

export default TraineeCalendar;