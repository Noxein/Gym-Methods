import React, { useState } from 'react'
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { editUserHandle } from '@/app/actions';
import { ErrorDiv } from '../../ui/ErrorDiv';
import { SmallLoader } from '../../Loading/SmallLoader';

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
    const[isLoading,setIsLoading] = useState(false)
    const handleEdit = async() => {
        setError('')
        setIsLoading(true)
        const data = await editUserHandle(value!,handle?.id!)
        console.log(data)
        if(data && data.error){
            setError(data.error)
        }
        setIsLoading(false)
        handleHideModal()
    }
    const handleHideModal = () => {
        hideModal(false)
    }
  return (
    <div className='flex flex-col gap-4 text-center text-xl w-full mx-5'>
        
        <Input labelName='Podaj nazwę uchwytu' value={value} onChange={(e)=>setValue(e.target.value)}/>
        {isLoading && <SmallLoader />}
        <ErrorDiv error={error}/>
        <div className='flex gap-2'>
            <Button isPrimary className='flex-1' onClick={handleEdit} disabled={isLoading}>Zapisz</Button>
            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={isLoading}>Anuluj</Button>
        </div>
    </div>
  )
}
