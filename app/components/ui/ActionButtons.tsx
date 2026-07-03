'use client'
import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";

type ActionButtonsProps = {
    onSave: () => void | Promise<void>,
    onCancel: () => void | Promise<void>,
    loading?: boolean,
}

function ActionButtons( { onSave, onCancel, loading }: ActionButtonsProps ) {
    const u = useTranslations('Utils')

    return ( 
        <div className="fixed max-w-mobile bottom-20 mt-auto mx-auto w-screen z-30 bg-darkLight py-5">
            <div className="flex gap-5 px-5">
                <Button blue className="flex-1" onClick={onCancel} loading={loading}>{u('Cancel')}</Button>
                <Button blue isPrimary className="flex-1" onClick={onSave} loading={loading}>{u('Save')}</Button>
            </div>
        </div>
     );
}

export default ActionButtons;
