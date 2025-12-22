import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { localStorageStringForLongTermPlan } from "@/app/lib/utils";
import { useContext } from "react";

function DeleteChangeModal({handleClose,hideBothModals}: {handleClose: ()=>void, hideBothModals: () => void}) {

    const {
        setPlanData,
        planData
    } = useContext(LongPlanEditorContext)!

    const revertAllChanges = () => {
        const string = localStorageStringForLongTermPlan(planData?.name!)

        const data = localStorage.getItem(string)

        if(data){
            const parseData = JSON.parse(JSON.parse(data))
            console.log(typeof parseData)
            setPlanData(parseData)
        }
        
        hideBothModals()
    }
    return ( <div className="mx-5">
        <p className="mb-5 text-white text-center text-lg">Czy na pewno chcesz cofnąć wszystkie zmiany dotyczące zwiększania masy ćwiczeń?</p>
        <div className="flex gap-3">
            <Button isPrimary className="flex-1" onClick={handleClose}>Anuluj</Button>
            <Button className="flex-1" onClick={revertAllChanges}>Cofnij zmiany</Button>
        </div>
    </div> );
}

export default DeleteChangeModal;