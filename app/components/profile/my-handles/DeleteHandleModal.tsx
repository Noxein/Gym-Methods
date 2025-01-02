import { useState } from 'react'
import { Button } from '../../ui/Button';
import { deleteUserHandle } from '@/app/actions';
import { SmallLoader } from '../../Loading/SmallLoader';
import { ErrorDiv } from '../../ui/ErrorDiv';
import { useTranslations } from 'next-intl';

interface DeleteHandleModal {
    handle?: {
        id: string;
        handlename: string;
    }
    hideModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const DeleteHandleModal = ({handle,hideModal}:DeleteHandleModal) => {
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)

    const handleDelete = async () => {
        setError('')
        setIsLoading(true)
        const data = await deleteUserHandle(handle?.id!)
        if(data && data.error){
            setError(e(data.error))
            return setIsLoading(false)
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
        {isLoading && <SmallLoader />}
        <ErrorDiv error={error}/>
        <div className='flex gap-2'>

            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={isLoading}>{u("Cancel")}</Button>
            <Button isPrimary className='flex-1' onClick={handleDelete} disabled={isLoading}>{u("Delete")}</Button>
            
        </div>
    </div>
  )
}
