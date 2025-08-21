'use client'
import { Icon } from "@/app/components/Icon";
import { SubPlanData, UserExercise } from "@/app/types";
import { ExpandIcon2 } from "@/app/ui/icons/ExpandIcon";
import { useContext, useState } from "react";
import SingleExercise from "./SingleExercise";
import { Input } from "@/app/components/ui/Input";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { Button } from "@/app/components/ui/Button";
import { HideShowHTMLScrollbar, nameTrimmer } from "@/app/lib/utils";
import { useTranslations } from "next-intl";

type SinglePlanType = {
    plan: SubPlanData,
    planIndex: number,
    allExercisesInOneArray: (string | UserExercise)[]
}

function SinglePlan({plan, planIndex, allExercisesInOneArray}:SinglePlanType) {
    const[isOpen,setIsOpen] = useState(false)
    const[selecedExerciseIndex,setSelectedExerciseIndex] = useState(0)
    const { planData,setPlanData,planIndexRef,setShowDeleteTrainigPopUp,setShowImportTrainingModal,setShowAddExercise,updateToLocalStorage,state } = useContext(LongPlanEditorContext)!
    const d = useTranslations("DefaultExercises")
    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/Long-Term-Plans")
    const firstExerciseName = plan.exercises.length > 0 ? allExercisesInOneArray.includes(plan.exercises[0].exercisename) ? d(nameTrimmer(plan.exercises[0].exercisename)) : plan.exercises[0].exercisename : ''
    
    const flip = () => {
        if(state === 'uploading') return
        setIsOpen(!isOpen)
    }

    const setPlanName = (value:string) => {
        if(state === 'uploading') return
        let planDataCopy = {...planData!}
        planDataCopy.subplans[planIndexRef.current].name = value
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const handleDeleteTraining = () => {
        if(state === 'uploading') return
        HideShowHTMLScrollbar('hide')
        setShowDeleteTrainigPopUp(true)
    }

    const showImportTrainigModal = () => {
        if(state === 'uploading') return
        HideShowHTMLScrollbar('hide')
        setShowImportTrainingModal(true)
    }

    const showAddExerciseModal = () => {
        if(state === 'uploading') return
        HideShowHTMLScrollbar('hide')
        setShowAddExercise(true)
    }
    
    if(isOpen) return (
        <div className={`text-white flex flex-col px-5 py-2 bg-darkLight duration-200 rounded-lg `} onClick={()=>planIndexRef.current = planIndex}>
                <button onClick={flip} className="flex justify-end">        
                    <Icon onClick={flip}>
                        <ExpandIcon2 fill="#fff" expanded={false}/>
                    </Icon>
                </button>
            <div className="flex justify-between">

                <Input labelName="Nazwa" value={plan.name} onChange={e=>setPlanName(e.target.value)}/>

            </div>



            <div className="flex mt-2 gap-2">
                <Button className="flex flex-1 justify-center bg-dark text-sm border-notSelected" onClick={showImportTrainigModal} disabled={state==='uploading'}>
                    {u("Import")}
                </Button>
                <Button onClick={showAddExerciseModal} className="flex-1 text-sm border-notSelected" disabled={state==='uploading'}>
                    {u("AddExercise")}
                </Button>
            </div>

            <div className="bg-steel my-5 rounded-lg">
                <div className="flex flex-col gap-4">
                    {plan.exercises && plan.exercises.map((exercise,exerciseIndex)=><SingleExercise setSelectedExerciseIndex={setSelectedExerciseIndex} selecedExerciseIndex={selecedExerciseIndex} key={exercise.exerciseid} exercise={exercise} planIndex={planIndex} exerciseIndex={exerciseIndex} allExercisesInOneArray={allExercisesInOneArray}/>)}
                </div>
            </div>

            <Button className="border-red text-red" onClick={handleDeleteTraining} disabled={state==='uploading'}>{t("DeleteThisTraining")}</Button>
        </div>
    )

    return (
    <div className="flex justify-between px-5 pt-2 pb-5 text-white bg-darkLight rounded-lg">
        <div>

            <p>{plan.name}</p>

            {plan.exercises.length === 1 && <div className="text-neutral-400">{firstExerciseName}</div>}
            {plan.exercises.length > 1 && <div className="text-neutral-400">{firstExerciseName}... +{plan.exercises.length-1}</div>}

        </div>
        
        <Icon onClick={flip}>
            <ExpandIcon2 fill="#fff" expanded={true}/>
        </Icon>

    </div>
    );
}

export default SinglePlan;