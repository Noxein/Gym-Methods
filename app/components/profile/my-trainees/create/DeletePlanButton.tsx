import { Icon } from "@/app/components/Icon";
import ConfirmModalContext from "@/app/context/ConfirmModalContext";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { useContext } from "react";

type DeletePlanButtonProps = {
    planIndex: number;
}
function DeletePlanButton({ planIndex }: DeletePlanButtonProps) {

    const { plan, setPlan, setShowSinglePlanModal, loading } = useContext(CreateTrainingContext)!

    const { modalState, setModalState } = useContext(ConfirmModalContext)!

    const modalPopUp = () => {
        if(loading) return;
        
        setModalState({
            isOpen: true,
            message: "Are you sure you want to delete this plan?",
            onConfirm: handleDelete,
            onDecline: () => setModalState({...modalState, isOpen: false})
            })
    }
    const handleDelete = () => {
        if(loading) return;

        setShowSinglePlanModal(false)
        HideShowHTMLScrollbar('show')
        let planCopy = structuredClone(plan)
        planCopy.plan.splice(planIndex, 1)
        setPlan(planCopy)
        setModalState({...modalState, isOpen: false, onConfirm: () => {}, onDecline: () => {}})
    }

    return ( 
        <Icon role="button" onClick={modalPopUp}>
            <TrashIcon fill="#d9d9d9"/>
        </Icon>
     );
}

export default DeletePlanButton;