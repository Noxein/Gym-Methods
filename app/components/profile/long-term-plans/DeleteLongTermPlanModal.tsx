import { handleDeleteLongTermPlan } from "@/app/actions";
import { Button } from "../../ui/Button";
import { useState } from "react";
import { ErrorDiv } from "../../ui/ErrorDiv";
import { useTranslations } from "next-intl";

type DeleteLongTermPlanModalTypes = {
    planName: string,
    setShowDeleteTrainingModal: React.Dispatch<React.SetStateAction<boolean>>,
}

function DeleteLongTermPlanModal({planName,setShowDeleteTrainingModal}:DeleteLongTermPlanModalTypes) {

    const e = useTranslations("Errors")
    const u = useTranslations('Utils')
    const t = useTranslations('Home/Profile/Long-Term-Plans')

    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const handleDeleteTraining = async () => {
        setLoading(true)
        setError('')

        const result = await handleDeleteLongTermPlan(planName)

        if(result?.error){
            setLoading(false)
            return setError(e(result.error))
        } 

        setLoading(false)
        setShowDeleteTrainingModal(false)
    }
    return ( 
    <div onClick={e=>e.stopPropagation()} className="w-full mx-5">

        <p className="text-center text-xl">{t("AreYouSureYouWannaDelete")} {planName}</p>

        <ErrorDiv error={error}/>

        <div className="flex gap-2 mt-4">
            <Button className="flex-1" onClick={()=>setShowDeleteTrainingModal(false)} disabled={loading}>{u('Cancel')}</Button>
            <Button className="flex-1" isPrimary onClick={handleDeleteTraining} disabled={loading}>{u('Delete')}</Button>
        </div>
        
    </div> 
    );
}

export default DeleteLongTermPlanModal;