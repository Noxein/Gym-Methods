import { TraineePlan } from "@/app/types";
import { Button } from "../../ui/Button";
import TodaysTraining from "./TodaysTraining";
import { isSameDay } from "date-fns";
import SubTrainings from "./SubTrainings";

type TraineeTrainingsProps = {
    traineeTrainings: TraineePlan[]
}

function TraineeTrainings({traineeTrainings}:TraineeTrainingsProps) {
    if(traineeTrainings.length === 0) return "Brak treningu"

    return ( 
        <div>
            {traineeTrainings.map((training) => {
                return <SubTrainings key={training.id} plan={training}/>
            })}
        </div>
     );
}

export default TraineeTrainings;