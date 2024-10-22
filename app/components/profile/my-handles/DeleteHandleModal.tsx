import React, { useState } from 'react'
import { Button } from '../../ui/Button';
import { deleteUserHandle } from '@/app/actions';
import { SmallLoader } from '../../Loading/SmallLoader';
import { ErrorDiv } from '../../ui/ErrorDiv';

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
            setError(data.error)
        }
        setIsLoading(false)
        handleHideModal()
    }
    const handleHideModal = () => {
        hideModal(false)
    }
  return (
    <div className='flex flex-col gap-4 text-center text-xl'>
        <p>Czy napewno chcesz usunąć uchwyt o naziwe <br/> <b>{handle && handle.handlename}</b></p>
        {isLoading && <SmallLoader />}
        <ErrorDiv error={error}/>
        <div className='flex gap-2'>
            <Button isPrimary className='flex-1' onClick={handleDelete} disabled={isLoading}>Usuń</Button>
            <Button isPrimary={false} className='flex-1' onClick={handleHideModal} disabled={isLoading}>Anuluj</Button>
        </div>
    </div>
  )
}
