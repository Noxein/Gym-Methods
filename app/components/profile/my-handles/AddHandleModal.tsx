import { useState } from 'react'
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { addNewUserHandle } from '@/app/actions';
import { ErrorDiv } from '../../ui/ErrorDiv';
import { SmallLoader } from '../../Loading/SmallLoader';
import { useTranslations } from 'next-intl';

interface DeleteHandleModal {
    hideModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const AddHanleModal = ({hideModal}:DeleteHandleModal) => {
    const[name,setName] = useState('')
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)

    const handleAdd = async () => {
        setError('')
        setIsLoading(true)
        const data = await addNewUserHandle(name)
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
        <Input labelName={t("HandleName")} value={name} onChange={e=>setName(e.target.value)} required/>
        {isLoading && <SmallLoader />}
        <ErrorDiv error={error}/>
        <div className='flex gap-2 w-full'>

            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={isLoading}>{u("Cancel")}</Button>
            <Button isPrimary className='flex-1' onClick={handleAdd} disabled={isLoading}>{u("Add")}</Button>
            
        </div>
    </div>
  )
}
