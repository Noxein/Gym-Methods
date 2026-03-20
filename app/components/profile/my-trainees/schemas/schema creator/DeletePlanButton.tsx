'use client'
import { Icon } from "@/app/components/Icon";
import { Button } from "@/app/components/ui/Button";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { useTranslations } from "next-intl";
import { useContext } from "react";

type DeletePlanButtonProps = {
    planIndex: number;
}
function DeletePlanButton({ planIndex }: DeletePlanButtonProps) {

    const { schema, setSchema, setConfirmationModal, loading } = useContext(TrainingSchemaContext)!

    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')
        
    const handleModalOpen = () => {
        if(loading) return;
        const name = schema.plan[planIndex].name
        setConfirmationModal({
            isOpen: true,
            message: `${t('AreYouSureYouWantToDeletePlan')} "${name}"?`,
            onConfirm: () => handleDelete(),
            onDecline: () => setConfirmationModal(null)
        })
    }
    const handleDelete = () => {
        if(loading) return;
        let schemaCopy = structuredClone(schema);
        schemaCopy.plan.splice(planIndex, 1);
        setSchema(schemaCopy);
        setConfirmationModal(null)
    }

    return ( 

            <Icon onClick={handleModalOpen}>
                <TrashIcon fill='#d9d9d9'/>
            </Icon>

     );
}

export default DeletePlanButton;