'use client'

import { Button } from "@/app/components/ui/Button";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { TraineeSingleTraining } from "@/app/types";
import { addDays } from "date-fns";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { v4 } from "uuid";

function AddPlanButton() {

    const { plan, setPlan, loading } = useContext(CreateTrainingContext)!

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")

    const handleClick = () => {
        if(loading) return;
        
        let planCopy = structuredClone(plan)
        let newPlan:TraineeSingleTraining = {
            id: v4(),
            name: `Plan ${planCopy.plan.length + 1}`,
            date: addDays(new Date(), planCopy.plan.length + 1),
            exercises: [],
            iscompleted: false
        }
        planCopy.plan.push(newPlan)
        setPlan(planCopy)
    }

    return ( 
        <Button blue onClick={handleClick} disabled={loading}> {t("AddPlan")} </Button>
     );
}

export default AddPlanButton;