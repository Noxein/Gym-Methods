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

    const currentDay = traineeTrainings.reduce((latest, training) => {
        if(training.iscompleted) latest = latest + 1
        return latest
    }, 0)

    return ( 
        <div>
            {traineeTrainings.map((training) => {
                return <SubTrainings key={training.id} plan={training} planLength={training.plan.length}/>
            })}
        </div>
     );
}

export default TraineeTrainings;