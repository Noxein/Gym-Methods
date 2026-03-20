'use client'
import { Input } from "@/app/components/ui/Input";
import { useContext } from "react";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import TrainingSubPlans from "./TrainingSubPlans";
import { useTranslations } from "next-intl";

function Training() {
    const { plan, setPlan, loading } = useContext(CreateTrainingContext)!

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.name = e.target.value
        setPlan(planCopy)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    return ( 
        <div className="text-white mx-5 mt-5 flex justify-center flex-col text-center">
            <div className="bg-darkLight w-full">
                <Input labelName={t("TrainingName")} value={plan.name} onChange={handleNameChange} disabled={loading} />
            </div>

            <TrainingSubPlans />
        </div>
     );
}

export default Training;