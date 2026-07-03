'use client'
import { Button } from "@/app/components/ui/Button";
import ConfirmModalContext from "@/app/context/ConfirmModalContext";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { HideShowHTMLScrollbar, TraineePlanErrorChecker } from "@/app/lib/utils";
import { handleAddTrainingForTrainee } from "@/app/trainerActions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function ActionButtons() {
    const u = useTranslations('Utils')
    const router = useRouter()
    const { showSinglePlanModal, setShowSinglePlanModal, copyOfLatestPlanClicked, latestPlanIndexClicked, plan, setPlan, locale, loading, setLoading } = useContext(CreateTrainingContext)!
    const { setModalState } = useContext(ConfirmModalContext)!

    const trainee = useContext(CreateTrainingContext)!.userData;
    
    const handleSinglePlanSave = () => {
        HideShowHTMLScrollbar('show')
        setShowSinglePlanModal(false)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")

    const handleSave = async () => {
        if(loading) return
        
        const possibleError = TraineePlanErrorChecker(plan, locale)
        if(possibleError) {
            //client side validation error, show the error in a modal
            setModalState({
                isOpen: true,
                message: possibleError,
                onConfirm: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
                },
                onDecline: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
                }
            })
            return
        }
        setLoading(true)

        const result = await handleAddTrainingForTrainee(plan, trainee.id) 

        setLoading(false)

        if(result.error){
            setModalState({
                isOpen: true,
                message: result.error,
                onConfirm: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
                },
                onDecline: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
                }
            })
            return
        }
        router.push('/home/profile/my-trainees')
    }

    const handleCancel = () => {
            setModalState({
                isOpen: true,
                message: t("AreYouSureYouWantToCancel"),
                onConfirm: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {router.back()}, onDecline: () => {} })
                },
                onDecline: () => {
                    setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
                }
            })
    }

    const handleCancelSave = () => {
        if(loading) return

        setModalState({
            isOpen: true,
            message: t("AreYouSureYouWantToCancel"),
            onConfirm: () => {
                //aka reset everything to the state before the user started editing the plan
                let planCopy = structuredClone(plan)
                if(copyOfLatestPlanClicked.current) {
                    planCopy.plan[latestPlanIndexClicked.current] = copyOfLatestPlanClicked.current
                    setPlan(planCopy)
                }
                setShowSinglePlanModal(false)
                HideShowHTMLScrollbar('show')
                setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })    
            },
            onDecline: () => {
                //aka just close the modal and do nothing
                setModalState({isOpen: false, message: '', onConfirm: () => {}, onDecline: () => {} })
            }
        })
    }
    return ( 
        <div className="fixed mt-auto mx-auto max-w-mobile bottom-20 w-screen z-30 bg-darkLight py-5">
            {showSinglePlanModal ?
            <div className="flex gap-5 px-5">
                <Button blue className="flex-1" onClick={handleCancelSave} loading={loading}>{u('Cancel')}</Button>
                <Button blue isPrimary className="flex-1" onClick={handleSinglePlanSave} loading={loading}>{u('Save')}</Button>
            </div> : 
            <div className="flex gap-5 px-5">
                <Button blue className="flex-1" onClick={handleCancel} loading={loading}>{u('Cancel')}</Button>
                <Button blue isPrimary className="flex-1" onClick={handleSave} loading={loading}>{u('Save')}</Button>
            </div>
            }
        </div>
     );
}

export default ActionButtons;
