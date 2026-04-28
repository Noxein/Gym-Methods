import { TraineePlan } from "@/app/types";
import TodaysTraining from "./TodaysTraining";
import { isSameDay } from "date-fns";
import NextTraining from "./NextTraining";

type Props = {
    plan: TraineePlan,
    planLength: number
}

function SubTrainings({ plan, planLength }: Props) {

    const currentDay = plan.plan.findIndex(x=>x.iscompleted===false)!

    return ( 
        <div>
            {isSameDay(new Date(plan.plan[0].date), new Date()) ? 
                <TodaysTraining key={plan.id} training={plan} currentDay={currentDay} planLength={planLength} /> : 
                <NextTraining plan={plan} currentDay={currentDay} />
            }
        </div>
     );
}

export default SubTrainings;