import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/SelectField";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { ExerciseTypes, TrainingExerciseType } from "@/app/types";
import { useState, useContext, ChangeEventHandler, SelectHTMLAttributes, ChangeEvent } from "react";
import DeleteChangeModal from "./DeleteChangesModal";
import { useTranslations } from "next-intl";

function IncreaseWeightModal({setShowIncreaseWeightModal}: {setShowIncreaseWeightModal: (show: boolean) => void}) {
    const t = useTranslations("Home/Profile/Long-Term-Plans/[LongTermPlanName]")
    const u = useTranslations("Utils")
    const { 
        planData,
        setPlanData
    } = useContext(LongPlanEditorContext)!

    const[showDeleteChangesModal,setShowDeleteChangesModal] = useState(false)

    const allExercisesFromPlan = () => {
        if(!planData) return []
        let exercisesSet = [] as TrainingExerciseType[]

        planData.subplans.forEach(subplans=>{
            subplans.exercises.forEach(exercise=>{
                const exists = exercisesSet.find(ex=>ex.id===exercise.exerciseid)
                if(!exists){
                    exercisesSet.push({
                        id: exercise.exerciseid,
                        exercisename: exercise.exercisename,
                        exerciseid: exercise.exerciseid,
                    })
                }
            })})
        return exercisesSet
    }

    const[allExercises, setAllExercises] = useState<TrainingExerciseType[] | null>(allExercisesFromPlan)
    const[unit,setUnit] = useState<'kg'|'%'>('%')
    const[selectedExercisesIds,setSelectedExercisesIds] = useState<string[]>([])
    const[value,setValue] = useState<number>(0)

    const handleIncreaseWeight = () => {
        if(!planData) return
        let planDataCopy = structuredClone(planData)
        for(let i = 0; i<planDataCopy.subplans.length; i++){
            for(let j = 0; j<planDataCopy.subplans[i].exercises.length; j++){
                if(selectedExercisesIds.includes(planDataCopy.subplans[i].exercises[j].exerciseid)){
                    //increase weight goals
                    for(let k = 0; k<planDataCopy.subplans[i].exercises[j].setgoals.length; k++){
                        if(unit === '%'){
                            const newValue = planDataCopy.subplans[i].exercises[j].setgoals[k].weightgoal + (planDataCopy.subplans[i].exercises[j].setgoals[k].weightgoal * (value/100))
                            const roundedValueToQuarter = Math.round(newValue * 4) / 4
                            planDataCopy.subplans[i].exercises[j].setgoals[k].weightgoal = roundedValueToQuarter
                        } else {
                            const newValue = planDataCopy.subplans[i].exercises[j].setgoals[k].weightgoal + value
                            const roundedValueToQuarter = Math.round(newValue * 4) / 4
                            planDataCopy.subplans[i].exercises[j].setgoals[k].weightgoal = roundedValueToQuarter
                        }
                    }
                }
            }
        }

        setPlanData(planDataCopy)
        HideShowHTMLScrollbar('show')
        setShowIncreaseWeightModal(false)
    }
    const handleUnitChange = (event:ChangeEvent<HTMLSelectElement>) => {
        const unit =event.target.value as '%' | 'kg'
        setUnit(unit)
    }

    const handleRevertAllChanges = () => {
        //load from localstorage
    }
    const HandleClickExercise = (exerciseid: string) => {
        const isSelected = selectedExercisesIds.includes(exerciseid)
        if(isSelected) return setSelectedExercisesIds(prev=>prev.filter(id=>id!==exerciseid))
        setSelectedExercisesIds(prev=>[...prev,exerciseid])
    }

    const hideBothModals = () => {
        setShowDeleteChangesModal(false)
        setShowIncreaseWeightModal(false)
        HideShowHTMLScrollbar('show')
    }

    return ( 
    <div onClick={e=>e.stopPropagation()} className="bg-dark-700 p-5 text-white rounded-lg w-mobile max-w-mobile flex-col flex">
        <p className="mb-10 text-xl font-semibold text-center">{t("IncreaseWeightForExercises")}</p>

        <div className="flex gap-2">
            <Input labelName={unit} className="flex-1" onChange={e=>setValue(Number(e.target.value))}/>
            <Select labelName={u("Unit")} valuesToLoop={['%','kg']} onChange={handleUnitChange}/>
        </div>

        <div className="flex flex-col overflow-y-auto max-h-64 my-5">
            <p className="mb-2">{t("SelectExercisesToIncrease")}</p>
            {allExercises && allExercises.map((exercise,index)=>(
                <div key={exercise.id} className="flex items-center mb-2 ml-2"
                onClick={()=>HandleClickExercise(exercise.id)}
                >
                    <input type="checkbox" 
                        className="mr-2"
                        checked={selectedExercisesIds.includes(exercise.id)}
                        />
                    <span>{exercise.exercisename}</span>
                </div>))}
        </div>
        <Button isPrimary onClick={handleIncreaseWeight}>{t("IncreaseWeightAction")}</Button>
        <Button onClick={()=>setShowDeleteChangesModal(true)} className="mt-2" >{t("RevertAllChanges")}</Button>

        {showDeleteChangesModal && <BlurBackgroundModal>
            <DeleteChangeModal handleClose={()=>setShowDeleteChangesModal(false)} hideBothModals={hideBothModals}/>
        </BlurBackgroundModal>}
    </div>
    );

}

export default IncreaseWeightModal
