import { Icon } from "@/app/components/Icon";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/SelectField";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { Series, TraineeSetGoal, TraineeSingleExercise } from "@/app/types";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { useTranslations } from "next-intl";
import { use, useContext } from "react";

type SetProps = {
    set: {
        goal: TraineeSetGoal;
        actual: Series;
    },
    setIndex: number,
    exerciseIndex: number,
    planIndex: number,
    exercise: TraineeSingleExercise
}

function Set({ set, setIndex, exerciseIndex, planIndex, exercise }: SetProps) {

    const { plan, setPlan, exercisesThatRequireTimeMesure, showSideSelection, loading } = useContext(CreateTrainingContext)!
    const minWeight = set.goal.weightgoal

    const handleMinWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets[setIndex].goal.weightgoal = Number(e.target.value)
        setPlan(planCopy)
    }

    const handleMinRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets[setIndex].goal.repetitionsgoalmin = Number(e.target.value)
        setPlan(planCopy)
    }

    const handleMaxRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets[setIndex].goal.repetitionsgoalmax = Number(e.target.value)
        setPlan(planCopy)
    }
    
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets[setIndex].goal.timegoal = Number(e.target.value)
        setPlan(planCopy)
    }

    const handleSideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets[setIndex].goal.side = e.target.value as 'Left' | 'Right' | 'Both'
        setPlan(planCopy)
    }
    const usesTimeMeasure = exercisesThatRequireTimeMesure.some(exe => exe.id === exercise.exerciseid)

    const deleteSet = () => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].sets.splice(setIndex, 1)
        setPlan(planCopy)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    const u = useTranslations("Utils")
    return ( 
        <div className={`flex flex-col gap-2 p-2 ${setIndex % 2 === 0 ? 'bg-dark' : ''} rounded-lg`}>
            <div className="flex">
                <Input alwaysActive labelClass="text-gray-300" labelName={u("Weight")} className={`py-1 ${setIndex % 2 === 1 ? 'bg-darkLight' : ''}`} value={minWeight} onChange={handleMinWeightChange} disabled={loading}/>
                <Icon onClick={deleteSet}>
                    <TrashIcon fill="#d9d9d9"/>
                </Icon>
            </div>
            <div className="flex gap-2">
                <Input alwaysActive labelClass="text-gray-300" labelName={t("RepetitionsMin")} className={`py-1 ${setIndex % 2 === 1 ? 'bg-darkLight' : ''}`} value={set.goal.repetitionsgoalmin} onChange={handleMinRepsChange} disabled={loading}/>
                <Input alwaysActive labelClass="text-gray-300" labelName={t("RepetitionsMax")} className={`py-1 ${setIndex % 2 === 1 ? 'bg-darkLight' : ''}`} value={set.goal.repetitionsgoalmax} onChange={handleMaxRepsChange} disabled={loading}/>
            </div>
            <div className="flex gap-2">
                {usesTimeMeasure && <Input alwaysActive labelClass="text-gray-300" labelName={t("TimeInSeconds")} className={`py-1 ${setIndex % 2 === 1 ? 'bg-darkLight' : ''}`} value={set.goal.timegoal} onChange={handleTimeChange} disabled={loading}/>}
                {showSideSelection && <Select labelClass="text-gray-300" labelName={u("Side")} className={`py-1 ${setIndex % 2 === 1 ? 'bg-darkLight' : ''}`} value={set.goal.side} onChange={handleSideChange} valuesToLoop={["Left", "Right",'Both']} disabled={loading}/>}
            </div>
        </div>
     );
}

export default Set;