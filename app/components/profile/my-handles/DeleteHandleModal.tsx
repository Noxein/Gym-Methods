import { useState } from 'react'
import { Button } from '../../ui/Button';
import { deleteUserHandle } from '@/app/actions';
import { ErrorDiv } from '../../ui/ErrorDiv';
import { useTranslations } from 'next-intl';
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv';

interface DeleteHandleModal {
    handle?: {
        id: string;
        handlename: string;
    }
    hideModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const DeleteHandleModal = ({handle,hideModal}:DeleteHandleModal) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const handleDelete = async () => {
        setError('')
        setLoading(true)
        const data = await deleteUserHandle(handle?.id!)
        if(data && data.error){
            setError(e(data.error))
            return setLoading(false)
        }
        handleHideModal()
    }
    const handleHideModal = () => {
        hideModal(false)
    }

    const t = useTranslations("Home/Profile/My-Handles")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")
    
  return (
    <div className='flex flex-col gap-4 text-center text-xl w-full mx-5'>
        <p>{t("AreYouSure")} <br/> <b>{handle && handle.handlename}</b></p>
        {loading && <SmallLoaderDiv loading={loading}/>}
        <ErrorDiv error={error}/>
        <div className='flex gap-2'>

            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={loading}>{u("Cancel")}</Button>
            <Button isPrimary className='flex-1' onClick={handleDelete} disabled={loading}>{u("Delete")}</Button>
            
        </div>
    </div>
  )
}
