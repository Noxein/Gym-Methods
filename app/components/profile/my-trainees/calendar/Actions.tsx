'use client'
import ActionButtons from "@/app/components/ui/ActionButtons";
import ConfirmModalContext from "@/app/context/ConfirmModalContext";
import TraineeCalendarContext from "@/app/context/TraineeCalendarContext";
import { updateManyTraineePlan } from "@/app/trainerActions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Actions() {

    const { modalState, setModalState} = useContext(ConfirmModalContext)!
    const { plans,updatedPlansIds } = useContext(TraineeCalendarContext)!

    const t = useTranslations('Home/Profile/My-Trainees/Calendar')
    const e = useTranslations('Errors')

    const router = useRouter()
    const handleCancel = () => {
        // Logic for cancel action
        setModalState({
                isOpen: true, 
                onConfirm: () => { router.back() } ,
                message: t('AreYouSureYouWantToCancel'),
                onDecline: () => setModalState(prev => ({...prev, isOpen: false}))
            });
    }

    const handleSave = () => {
        // Logic for save action
            setModalState({
                isOpen: true,
                onConfirm: handleConfirmSave,
                message: t('AreYouSureYouWantToSaveChanges'),
                onDecline: () => setModalState(prev => ({...prev, isOpen: false}))
            });
    }

    const handleConfirmSave = async () => {
        if(updatedPlansIds.length === 0) {
            router.back();
            return
        }
        const response = await updateManyTraineePlan( plans, updatedPlansIds)

        if(response.success) {
            router.back();
        }

        if(response.error) {
            setModalState({
                isOpen: true,
                onConfirm: () => setModalState(prev => ({...prev, isOpen: false})),
                message: e(response.error),
                onDecline: () => setModalState(prev => ({...prev, isOpen: false}))
            });

        }

    }
    return ( 
        <ActionButtons onCancel={handleCancel} onSave={handleSave} />
     );
}

export default Actions;