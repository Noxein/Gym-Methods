'use client'

import { Button } from "@/app/components/ui/Button";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function CustomModal() {
    const { confirmationModal, setConfirmationModal } = useContext(TrainingSchemaContext)!

    const u = useTranslations('Utils')

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-dark text-white p-5 rounded-lg w-96 mb-20">
                <h2 className="text-xl font-bold mb-4">{confirmationModal?.message}</h2>
                <div className="flex gap-4">
                    <Button onClick={confirmationModal?.onDecline} className="flex-1 text-blue-400 border-blue-400">{u('Cancel')}</Button>
                    <Button onClick={confirmationModal?.onConfirm} className="flex-1 text-blue-400 border-blue-400">{u('Confirm')}</Button>
                </div>
            </div>
        </div>
    )

}

export default CustomModal;