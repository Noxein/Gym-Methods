import { TraineePlan } from "@/app/types";
import NextTraining from "./NextTraining";

type Props = {
    plans: TraineePlan[],
    selectedDay: Date,
}

function SubTrainings({ plans, selectedDay }: Props) {

    return ( 
        <div>
            <NextTraining plans={plans} selectedDay={selectedDay} />
        </div>
     );
}

export default SubTrainings;