import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";

type CloneTrainingModalTypes = {

}

function CloneTrainingModal() {
    const { userTrainings, clonePlan, setShowCloneTraingModal } = useContext(LongPlanEditorContext)!

    const t = useTranslations("Home/Profile/Long-Term-Plans/[LongTermPlanName]")
    const u = useTranslations("Utils")

    const[showConfirmModal,setShowConfirmModal] = useState(false)
    const[selectedTraining,setSelectedTraining] = useState<{id:string, name:string}>()
    const[loading,setLoading] = useState(false)

    const copyPlan = async () => {
        setLoading(true)
        await clonePlan(selectedTraining?.name!)
        setLoading(false)
        setShowCloneTraingModal(false)
    }

    const handleSelectTrainingToClone = (training:{id:string, name:string}) => {
        setSelectedTraining(training)
        setShowConfirmModal(true)
    }

    return (
        <div onClick={e=>e.stopPropagation()} className="w-full mx-5 text-white">
            <p className="text-center text-2xl mb-2">{t("WhichTrainingToClone")}</p>
            <div className="flex flex-col gap-2">
                {userTrainings.current.map(training => (
                    <Button key={training.id} onClick={()=>handleSelectTrainingToClone(training)} disabled={loading}>{training.name}</Button>
                ))}
            </div>

            <Button onClick={()=>setShowCloneTraingModal(false)} className="w-full mt-4" isPrimary disabled={loading}>{u("Close")}</Button>

            {showConfirmModal && <BlurBackgroundModal>
                <div className="w-full mx-5">
                    <p className="text-center text-2xl">{t("AreYouSureYouWantToCloneTraining")} <b>{selectedTraining?.name} </b>?</p>
                    <div className="flex gap-2">
                        <Button className="flex-1" onClick={()=>setShowConfirmModal(false)} disabled={loading}>{u("Cancel")}</Button>
                        <Button className="flex-1" isPrimary onClick={copyPlan} disabled={loading}>{u("Clone")}</Button>
                    </div>
                </div>
            </BlurBackgroundModal>
            
            }
        </div>
    );
}

export default CloneTrainingModal;