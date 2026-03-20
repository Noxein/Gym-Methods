'use client'
import Plan from "./Plan";
import { useContext } from "react";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import AddPlanButton from "./AddPlanButton";
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { ExercisesSelector } from "@/app/components/first-setup/Casual/ExercisesSelector";
import { MapExercises } from "@/app/components/ui/MapExercises";
import { v4 } from "uuid";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";

type PlansProps = {

}

function Plans({  }: PlansProps) {

    const { schema } = useContext(TrainingSchemaContext)!

    const plans = schema.plan

    return ( 
        <div className="p-5 rounded-lg flex flex-col gap-5">
            {plans.map((plan, index) => (
                <Plan key={plan.id} planIndex={index} />
            ))}

            <AddPlanButton />
        </div>
     );
}

export default Plans;