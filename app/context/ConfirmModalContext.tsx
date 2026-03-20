'use client'

import { createContext, useState } from "react"
import { Button } from "../components/ui/Button";
import { useTranslations } from "next-intl";

type ConfirmModalContextType = {
    isOpen: boolean;
    message: string;
    onConfirm: () => void | Promise<void>;
    onDecline: () => void | Promise<void>;
}
const ConfirmModalContext = createContext<{
    modalState: ConfirmModalContextType;
    setModalState: React.Dispatch<React.SetStateAction<ConfirmModalContextType>>;
} | null>(null)

export default ConfirmModalContext;

function ConfirmModalDialog({ modalState }: { modalState: ConfirmModalContextType }) {
    const u = useTranslations('Utils')
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-dark text-white p-5 rounded-lg w-96 mb-20">
                <h2 className="text-xl font-bold mb-4">{modalState?.message}</h2>
                <div className="flex gap-4">
                    <Button onClick={modalState?.onDecline} className="flex-1 text-blue-400 border-blue-400">{u('Cancel')}</Button>
                    <Button onClick={modalState?.onConfirm} className="flex-1 text-blue-400 border-blue-400">{u('Confirm')}</Button>
                </div>
            </div>
        </div>
    )
}

export const ConfirmModalProvider = ({ children }: { children: React.ReactNode }) => {

    const[modalState, setModalState] = useState<ConfirmModalContextType>({
        isOpen: false,
        message: "",
        onConfirm: () => {},
        onDecline: () => {}
    });
    
    return (<ConfirmModalContext.Provider value={{
        modalState,
        setModalState
    }}>
        {modalState.isOpen && <ConfirmModalDialog modalState={modalState} />}
        {children}
    </ConfirmModalContext.Provider>)
}