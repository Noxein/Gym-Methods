'use client'

import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function DeleteTrainingModal() {

    const { planData, setShowDeleteTrainigPopUp,planIndexRef, setPlanData,updateToLocalStorage } = useContext(LongPlanEditorContext)!
    const exerciseName = planData?.subplans[planIndexRef.current].name

    const handleDeleteTraining = () => {
        const planDataCopy = {...planData!}
        const filtered = planDataCopy.subplans.filter((item,index)=>index!==planIndexRef.current) 
        planDataCopy.subplans = filtered
        planIndexRef.current = planIndexRef.current === 0 ? 0 : planIndexRef.current - 1
        setShowDeleteTrainigPopUp(false)
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
            <Button  className="flex-1" onClick={()=>setShowDeleteTrainigPopUp(false)}>
                {u("Cancel")}
            </Button>
            <Button className="flex-1" isPrimary onClick={handleDeleteTraining}>
                {u("Delete")}
            </Button>
        </div>
        
    </div> );
}

export default DeleteTrainingModal;