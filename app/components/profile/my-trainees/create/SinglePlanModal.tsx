import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useContext } from "react";
import TrainingPlan from "./TrainingPlan";

function SinglePlanModal() {

    const { plan, latestPlanIndexClicked } = useContext(CreateTrainingContext)!

    const selectedPlan = plan.plan[latestPlanIndexClicked.current]
    return ( 
       
            <div className="w-full h-screen backdrop-blur-sm p-5 z-10 text-white overflow-y-scroll pb-44">
                <TrainingPlan training={selectedPlan} planIndex={latestPlanIndexClicked.current}/>
            </div>

     );
}

export default SinglePlanModal;