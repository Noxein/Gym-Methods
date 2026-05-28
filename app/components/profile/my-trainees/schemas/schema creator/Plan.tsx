'use client'
import Exercises from "./Exercises";
import { Input } from "@/app/components/ui/Input";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { useContext } from "react";
import AddExerciseButton from "./AddExerciseButton";
import DeletePlanButton from "./DeletePlanButton";
import { useTranslations } from "next-intl";

type PlanProps = {
    planIndex: number;
}

function Plan({ planIndex }: PlanProps) {

    const { schema, setSchema, latestPlanIndexClicked, loading } = useContext(TrainingSchemaContext)!

    const plan = schema.plan[planIndex]

    const handlePlanNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchema((prevSchema) => {
            const updatedPlan = { ...prevSchema.plan[planIndex], name: e.target.value };
            const updatedSchema = { ...prevSchema, plan: [...prevSchema.plan.slice(0, planIndex), updatedPlan, ...prevSchema.plan.slice(planIndex + 1)] };
            return updatedSchema;
        });
    }

    const updateLatestPlanIndexClicked = () => {
        latestPlanIndexClicked.current = planIndex;
    }

    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')

    return ( 
        <div className="flex flex-col bg-darkLight rounded-lg p-5 gap-5" onClick={updateLatestPlanIndexClicked}>
            <div className='flex items-center justify-between'>
                <Input labelName={t('PlanName')} onChange={handlePlanNameChange} value={plan.name} className="flex-1" disabled={loading}/>
                <DeletePlanButton planIndex={planIndex}/>
            </div>


           <Exercises exercises={plan.exercises} planIndex={planIndex}/>

           <AddExerciseButton planIndex={planIndex} />
        </div>
     );
}

export default Plan;