import { SelectedExerciseWithTempo } from '@/app/types'
import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'

type DeleteTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteTempo = ({selectedExercise,setShowDeleteTempoModal}:DeleteTempoType) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const HandleDeleteTempo = async () => {
        setLoading(true)
        const isError = await DeleteTempoFromDb(selectedExercise.id)
        if(isError && isError.error){
            setLoading(false)
            return setError(isError.error)
        } 
        setLoading(false)
        HandleCloseModal()
    }

    const HandleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowDeleteTempoModal(false)
    }
  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-2 mx-5 mb-20 rounded-md text-xl text-white max-w-xl`}>
            <div className='text-center'>Czy napewno chcesz usunąć tempo do ćwiczenia <br/> <b>{selectedExercise.name}</b>?</div>
            <SmallLoaderDiv loading={loading}/>
            {loading?            
            <div className='flex justify-center mt-4'>
                <span className='loader1'></span>
            </div>:
            <div className='flex gap-2 mt-4'>
                <Button className='flex-1' onClick={HandleDeleteTempo} isPrimary disabled={loading}>Usuń</Button>
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>Anuluj</Button>
            </div>}
        </div>
    </BlurBackgroundModal>
  )
}
