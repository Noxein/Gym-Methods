import { useState } from 'react'
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { editUserHandle } from '@/app/actions';
import { ErrorDiv } from '../../ui/ErrorDiv';
import { useTranslations } from 'next-intl';
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv';

interface EditHandleModal {
    handle?: {
        id: string;
        handlename: string;
    },
    hideModal: React.Dispatch<React.SetStateAction<boolean>>,
}
export const EditHanleModal = ({handle,hideModal}:EditHandleModal) => {
    const[value,setValue] = useState(handle?.handlename)
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)
    const handleEdit = async() => {
        setError('')
        setLoading(true)
        const data = await editUserHandle(value!,handle?.id!)
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
        
        <Input labelName={t("HandleName")} value={value} onChange={(e)=>setValue(e.target.value)}/>
        {loading && <SmallLoaderDiv loading={loading} />}
        <ErrorDiv error={error}/>
        <div className='flex gap-2'>

            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={loading}>{u("Cancel")}</Button>
            <Button isPrimary className='flex-1' onClick={handleEdit} disabled={loading}>{u("Save")}</Button>

        </div>
    </div>
  )
}
