import { SelectedExerciseWithTempo } from '@/app/types'
import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb } from '@/app/actions'

type DeleteTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteTempo = ({selectedExercise,setShowDeleteTempoModal}:DeleteTempoType) => {
    const[error,setError] = useState('')
    const HandleDeleteTempo = async () => {
        const isError = await DeleteTempoFromDb(selectedExercise.id)
        if(isError && isError.error) return setError(isError.error)
        setShowDeleteTempoModal(false)
    }
  return (
    <BlurBackgroundModal onClick={()=>setShowDeleteTempoModal(false)}>
        <div onClick={e=>e.stopPropagation()}>
            Czy napewno chcesz usunąć tempo do ćwiczenia {selectedExercise.name}?
            <button onClick={HandleDeleteTempo}>Usuń</button>
            <button onClick={()=>setShowDeleteTempoModal(false)}>Anuluj</button>
        </div>
    </BlurBackgroundModal>
  )
}
