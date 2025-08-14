'use client'

import { useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { ErrorDiv } from "../../ui/ErrorDiv";
import { createNewLongTermPlan } from "@/app/actions";
import { useTranslations } from "next-intl";

type AddNewPlanModalTypes = {
    flip: () => void
}
function AddNewPlanModal({flip}:AddNewPlanModalTypes) {
    
    const[planName,setPlanName] = useState('')
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const e = useTranslations('Errors')
    const u = useTranslations('Utils')

    const handleAddNewLongTermPlan = async () => {
        setLoading(true)
        setError('')
        const result = await createNewLongTermPlan(planName)
        if(result?.error){
            setLoading(false)
            return setError(e(result.error))
        }
        setLoading(false)
        flip()
    }


    return ( 
        <div onClick={e=>e.stopPropagation()} className="w-full mx-5 flex flex-col gap-4">

            <Input labelName={u("Name")} value={planName} onChange={e=>setPlanName(e.target.value)} type="text"/>

            <ErrorDiv error={error}/>

            <div className="flex gap-2">
                <Button className="flex-1" onClick={flip} disabled={loading}>{u("Back")}</Button>
                <Button className="flex-1" isPrimary onClick={handleAddNewLongTermPlan} disabled={loading}>{u("Save")}</Button>
            </div>

        </div>)
}

export default AddNewPlanModal;