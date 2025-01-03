import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { Button } from '../../ui/Button'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv';
import { useTranslations } from 'next-intl';

interface ConfirmEndTrainingModal {
    text: string,
    showModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleEnd?: () => Promise<void>;
}
export const ConfirmEndTrainingModal = ({text,showModal,handleEnd}:ConfirmEndTrainingModal) => {
    const[loading,setLoading] = useState(false)
    const endFunction = async () => {
        if(!handleEnd) return
        setLoading(true)
        await handleEnd()
        setLoading(false)
    }
    const u = useTranslations("Utils")
  return (
    <BlurBackgroundModal>
        <div className='w-full mx-5 flex flex-col gap-4 text-white mb-20'>
            <h2 className='text-center text-2xl'>{text}</h2>
            <SmallLoaderDiv loading={loading}/>
            <div className='flex gap-4 text-xl'>
                
                <Button className='flex-1' onClick={()=>showModal(false)}>{u("Cancel")}</Button>
                <Button className='flex-1' isPrimary onClick={endFunction}>{u("Close")}</Button>
                
            </div>
        </div>
    </BlurBackgroundModal>
  )
}
