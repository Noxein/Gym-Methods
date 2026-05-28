'use client'

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { exercisesArr } from "@/app/lib/exercise-list";
import { HideShowHTMLScrollbar, nameTrimmer } from "@/app/lib/utils";
import { TraineeSingleTraining } from "@/app/types";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useContext } from "react";

type SingleTrainingInfoProps = {
    plan: TraineeSingleTraining,
    planIndex: number
    isFocused: boolean
}

function SingleTrainingInfo({ plan, planIndex, isFocused }: SingleTrainingInfoProps) {
    const { latestPlanIndexClicked, setShowSinglePlanModal, copyOfLatestPlanClicked, plan: contextPlan, setPlan, showSideSelection, loading } = useContext(CreateTrainingContext)!

    const updateLatestPlanIndexClicked = () => {
        if(loading) return;

        latestPlanIndexClicked.current = planIndex,
        copyOfLatestPlanClicked.current = structuredClone(plan)
        setShowSinglePlanModal(true)
        HideShowHTMLScrollbar('hide')
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(contextPlan)
        planCopy.plan[planIndex].name = e.target.value
        setPlan(planCopy)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        let planCopy = structuredClone(contextPlan)
        planCopy.plan[planIndex].date = new Date(e.target.value)
        setPlan(planCopy)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    const u = useTranslations("Utils")
    const de = useTranslations("DefaultExercises")
    const h = useTranslations("Home")
    return ( 
        <div className={`bg-darkLight rounded-lg p-4 transition-all duration-300 ${isFocused ? "opacity-100 scale-100 shadow-[0_0_40px_rgba(255,255,255,0.08)]" : "opacity-45 scale-[0.985]"}`}>
            <Input labelName={u("Name")} value={plan.name} onChange={handleNameChange} className="mb-2" disabled={loading}/>
            <Input labelName={u("Date")} type="date" value={plan.date.toISOString().split('T')[0]} onChange={handleDateChange} disabled={loading}/>

            <div className="text-left mt-2">
                <p>{u("Exercises")}:</p>
                <div className="max-h-60 overflow-y-auto scrollContainer">
                    {plan.exercises.map((exercise,index) => {

                        const translatedExerciseName = exercisesArr.includes(exercise.exercisename) ? de(nameTrimmer(exercise.exercisename)) : exercise.exercisename
                        
                        return(
                        <div key={exercise.id} className={`ml-4 ${index === plan.exercises.length - 1 ? "" : ""} ${index % 2 === 0 ? "bg-dark" : "bg-dark/55"} p-1 `}>
                            <p>{translatedExerciseName} - {exercise.sets.length} {h("Series", { lastNumber: exercise.sets.length })}</p>
                            <div>
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="flex text-gray-300 font-mono">
                                        <p className="ml-4"><span className="text-gray-500">{setIndex + 1}:</span> {set.goal.repetitionsgoalmin} - {set.goal.repetitionsgoalmax} {h("Repetitions", { lastNumber: set.goal.repetitionsgoalmax })} @ {set.goal.weightgoal} kg {showSideSelection? <span>{u(set.goal.side)}</span> : null}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    )}
                </div>

            </div>

            <Button className="w-full mt-4" blue onClick={updateLatestPlanIndexClicked} disabled={loading}>{t("EditTraining")}</Button>
        </div>
     );
}

export default SingleTrainingInfo;