import { TraineePlan } from "@/app/types";
import TodaysTraining from "./TodaysTraining";
import { isSameDay } from "date-fns";
import NextTraining from "./NextTraining";

type Props = {
    plan: TraineePlan,
}

function SubTrainings({ plan }: Props) {

    return ( 
        <div>
            <NextTraining plan={plan} />
        </div>
     );
}

export default SubTrainings;