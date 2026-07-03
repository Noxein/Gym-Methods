import { useContext } from "react";
import { Button } from "../../ui/Button";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { BigTrainingStarter } from "@/app/types";
import { ErrorDiv } from "../../ui/ErrorDiv";
import { useTranslations } from "next-intl";

type CloseTrainingModalTypes = {
    flip: () => void,
    handleCloseTraining: (planData: BigTrainingStarter) => Promise<void> | string,
    loading: boolean,
    error: string,
}

function CloseTrainingModal({flip,handleCloseTraining,loading,error}:CloseTrainingModalTypes) {
    const {
        planData
    } = useContext(LongPlanContext)!

    const e = useTranslations('Errors')
    const u = useTranslations('Utils')
    const t = useTranslations('Home/Start-Training/[TrainingName]')

    return ( <div className="flex flex-col gap-2 w-full mx-5 text-white" onClick={e=>e.stopPropagation()}>
        <p className="text-center text-2xl">{t("AreYouSureNamed", {name: planData.subplans[planData.currentplanindex].name})}</p>
        <div className="flex gap-2">
            {error && <ErrorDiv error={e(error)}/>}
            <Button className="flex-1" onClick={flip} loading={loading}>{u("Cancel")}</Button>
            <Button className="flex-1" isPrimary onClick={()=>handleCloseTraining(planData)} loading={loading}>{t("CloseTraining")}</Button>
        </div>
    </div> );
}

export default CloseTrainingModal;
