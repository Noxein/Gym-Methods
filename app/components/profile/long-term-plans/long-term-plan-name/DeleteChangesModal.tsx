import { Button } from "@/app/components/ui/Button";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { localStorageStringForLongTermPlan } from "@/app/lib/utils";
import { useContext } from "react";
import { useTranslations } from "next-intl";

function DeleteChangeModal({handleClose,hideBothModals}: {handleClose: ()=>void, hideBothModals: () => void}) {
    const t = useTranslations("Home/Profile/Long-Term-Plans/[LongTermPlanName]")
    const u = useTranslations("Utils")

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
        <p className="mb-5 text-white text-center text-lg">{t("RevertIncreaseChangesConfirm")}</p>
        <div className="flex gap-3">
            <Button isPrimary className="flex-1" onClick={handleClose}>{u("Cancel")}</Button>
            <Button className="flex-1" onClick={revertAllChanges}>{t("RevertAllChanges")}</Button>
        </div>
    </div> );
}

export default DeleteChangeModal;
