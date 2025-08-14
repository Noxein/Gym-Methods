import { useContext } from "react";
import { Button } from "../../ui/Button";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { BigTrainingStarter } from "@/app/types";

type CloseTrainingModalTypes = {
    flip: () => void,
    handleCloseTraining: (planData: BigTrainingStarter) => Promise<void> | string
}

function CloseTrainingModal({flip,handleCloseTraining}:CloseTrainingModalTypes) {
    const {
        planData
    } = useContext(LongPlanContext)!

    return ( <div className="flex flex-col gap-2 w-full mx-5 text-white" onClick={e=>e.stopPropagation()}>
        <p className="text-center text-2xl">Czy napewno chcesz zakończyć trening: {planData.subplans[planData.currentplanindex].name}?</p>
        <div className="flex gap-2">
            <Button className="flex-1" onClick={flip}>Anuluj</Button>
            <Button className="flex-1" isPrimary onClick={()=>handleCloseTraining(planData)}>Zakończ</Button>
        </div>
    </div> );
}

export default CloseTrainingModal;