import { Input } from "@/app/components/ui/Input";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { TraineeSingleTraining } from "@/app/types";
import { useContext } from "react";
import Exercises from "./Exercises";
import DeletePlanButton from "./DeletePlanButton";
import { useTranslations } from "next-intl";

type TrainingPlanProps = {
    training: TraineeSingleTraining,
    planIndex: number
}
function TrainingPlan({ training, planIndex }: TrainingPlanProps) {

    const { plan, setPlan, loading } = useContext(CreateTrainingContext)!

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].name = e.target.value
        setPlan(planCopy)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].date = new Date(e.target.value)
        setPlan(planCopy)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    const u = useTranslations("Utils")
    return ( 
        <div className="bg-darkLight py-5 px-2 rounded-lg" >
            <div className="flex">
                <div className="flex flex-col gap-4 flex-1">
                    <Input labelName={`${t("TrainingName")} ${String(planIndex + 1)}`} value={training.name} onChange={handleNameChange} disabled={loading}/>
                    <Input type="date" labelName={u("Day")} value={training.date.toISOString().split('T')[0]} onChange={handleDateChange} disabled={loading}/>
                </div>
                <div className="px-2">
                    <DeletePlanButton planIndex={planIndex}/>
                </div>
            </div>

            <Exercises planIndex={planIndex} />
        </div>
     );
}

export default TrainingPlan;