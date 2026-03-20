'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useContext } from "react";
import TrainingPlan from "./TrainingPlan";
import AddPlanButton from "./AddPlanButton";
import SingleTrainingInfo from "./SingleTrainingInfo";

function TrainingSubPlans() {
    const { plan } = useContext(CreateTrainingContext)! 
    return ( 
        <div className="flex flex-col gap-5 mt-5 mb-44">
            {plan.plan.map((subPlan, index) => (
                <SingleTrainingInfo plan={subPlan} key={subPlan.id} planIndex={index}/>
            ))}

            <AddPlanButton />
        </div>
     );
}

export default TrainingSubPlans;