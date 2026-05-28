import { Button } from "@/app/components/ui/Button";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { Series, TraineeSetGoal } from "@/app/types";
import { useTranslations } from "next-intl";
import { use, useContext } from "react";
import { v4 } from "uuid";

type AddSetButtonProps = {
    planIndex: number,
    exerciseIndex: number
}
function AddSetButton({ planIndex, exerciseIndex }: AddSetButtonProps) {
    const { plan, setPlan, loading } = useContext(CreateTrainingContext)!

    const handleAddSet = () => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        const setsLength = planCopy.plan[planIndex].exercises[exerciseIndex].sets.length
        let latestSet = setsLength > 0 ? structuredClone(planCopy.plan[planIndex].exercises[exerciseIndex].sets[setsLength - 1]) : null
        let set:{
            goal: TraineeSetGoal;
            actual: Series,
            isSetCompleted: boolean | undefined
        } = {
            goal: {
                id: v4(),
                repetitionsgoalmax: 0,
                repetitionsgoalmin: 0,
                weightgoal: 0,
                side:'Both',
                timegoal: 0
            },
            actual:{
                id: v4(),
                difficulty: "easy",
                repeat: 0,
                weight: 0,
                time: 0,
                side: 'Both'
            },
            isSetCompleted: undefined
        }
        if(latestSet){
            set = latestSet

            set.goal.id = v4()
            set.actual.id = v4()
        }

        planCopy.plan[planIndex].exercises[exerciseIndex].sets.push(set)
        setPlan(planCopy)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    return ( 
        <Button className="w-full py-2" blue onClick={handleAddSet} disabled={loading}>{t("AddSet")}</Button>
     );
}

export default AddSetButton;