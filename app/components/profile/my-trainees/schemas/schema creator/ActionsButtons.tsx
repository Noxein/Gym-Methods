'use client'
import { Button } from "@/app/components/ui/Button";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { createNewSchema, updateSchema } from "@/app/trainerActions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function ActionsButtons() {

    const { schema ,setConfirmationModal, loading, setLoading, page } = useContext(TrainingSchemaContext)!
    const[error, setError] = useState<string | null>(null)
    const router = useRouter()

    const u = useTranslations('Utils')
    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')
    const e = useTranslations('Errors')

    const handleCancel = () => {
        HideShowHTMLScrollbar('hide')
        setConfirmationModal({
            isOpen: true,
            message: t('AreYouSureYouWantToCancel'),
            onConfirm: () => cancel(),
            onDecline: () => {
                HideShowHTMLScrollbar('show')
                setConfirmationModal(null)
            }
        })
    }

    const cancel = () => {
        HideShowHTMLScrollbar('show')
        router.back();
    }

    const handleSave = async () => {
        if(schema.name.trim() === '') {
            setError('SchemaNameCannotBeEmpty')
            return
        }
        if(schema.plan.some(plan => plan.exercises.length === 0)) {
            setError('ThereCantBeAnyEmptyTrainings')
            return
        }
        if(schema.plan.some(plan => plan.name.trim() === '')) {
            setError('AllTrainingsMustHaveAName')
            return
        }
        setError(null)
        setLoading(true)

        let succes = false
        let error = null

        if(page === 'edit') {
            const result = await updateSchema(schema)
            result.success && (succes = true)
            result.error && (error = result.error)
        }
        if(page === 'create') {
            const result = await createNewSchema(schema)
            result.success && (succes = true)
            result.error && (error = result.error)
        }   
        
        setLoading(false)

        if(succes) {
            router.push('/home/profile/my-trainees/schemas')
            return
        }

        setError(error)
    }
    return ( 
        <div className="fixed max-w-mobile bottom-20 mt-auto  pb-8 pt-4 border-t border-gray-700 bg-dark w-full px-5">
            <div className="text-red-500 mb-2 text-center text-red">{error && e(error)}</div>
            <div className=" gap-4 flex z-20 bg-dark">
                <Button className='flex-1' blue onClick={handleCancel} loading={loading}>{u('Cancel')}</Button>
                <Button className='flex-1' blue isPrimary onClick={handleSave} loading={loading}>{u('Save')}</Button>
            </div>
        </div>
     );
}

export default ActionsButtons;
