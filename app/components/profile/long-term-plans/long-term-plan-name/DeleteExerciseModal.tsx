'use client'

import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function DeleteExerciseModal() {

    const { planData, setShowDeleteExercisePopUp,planIndexRef,exerciseIndexRef, setPlanData,updateToLocalStorage } = useContext(LongPlanEditorContext)!
    const exerciseName = planData!.subplans[planIndexRef.current].exercises[exerciseIndexRef.current].exercisename

    const handleDeleteExercise = () => {
        const planDataCopy = {...planData!}
        const filtered = planDataCopy.subplans[planIndexRef.current].exercises.filter((item,index)=>index!==exerciseIndexRef.current) 
        planDataCopy.subplans[planIndexRef.current].exercises = filtered
        exerciseIndexRef.current = exerciseIndexRef.current === 0 ? 0 : exerciseIndexRef.current - 1
        setShowDeleteExercisePopUp(false)
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
        HideShowHTMLScrollbar('show')
    }

    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/Long-Term-Plans")

    return ( 
    <div onClick={e=>e.stopPropagation()} className="text-white mx-5 w-full text-center text-xl">

        <p>{t("AreYouSureYouWannaDelete")} {exerciseName}?</p>

        <div className="flex gap-2" >
            <Button className="flex-1" onClick={()=>setShowDeleteExercisePopUp(false)}>
                {u('Cancel')}
            </Button>
            <Button isPrimary className="flex-1" onClick={handleDeleteExercise}>
                {u('Delete')}
            </Button>
        </div>
        
    </div> );
}

export default DeleteExerciseModal;