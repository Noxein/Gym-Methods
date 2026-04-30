import { TraineesWithoutPlans } from "@/app/types";
import StudentWithoutPlan from "./StudentWithoutPlan";

type Props = {
    traineesWithoutPlans: TraineesWithoutPlans[]  
};
function PlanTrainings({ traineesWithoutPlans }: Props) {
    return ( 
        <div className="bg-darkLight p-4 rounded-lg mt-10 w-full text-white">
            <div className="flex justify-between">
                <h2 className="text-2xl mb-4">Zaplanuj trening</h2>

                <p>{traineesWithoutPlans.length}</p>

            </div>

            <div className="w-full bg-borderInteractive h-1"></div>

            <div className="mt-4">
                {traineesWithoutPlans.map(trainee => (
                    <StudentWithoutPlan key={trainee.username} trainee={trainee}/>
                ))}
            </div>
        </div>
     );
}

export default PlanTrainings;