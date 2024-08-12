import { SelectedExerciseWithTempo } from '@/app/types'
import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'

type DeleteTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteTempo = ({selectedExercise,setShowDeleteTempoModal}:DeleteTempoType) => {
    const[error,setError] = useState('')
    const theme = useContext(ThemeContext)

    const HandleDeleteTempo = async () => {
        const isError = await DeleteTempoFromDb(selectedExercise.id)
        if(isError && isError.error) return setError(isError.error)
        setShowDeleteTempoModal(false)
    }
  return (
    <BlurBackgroundModal onClick={()=>setShowDeleteTempoModal(false)}>
        <div onClick={e=>e.stopPropagation()} className={`flex flex-col gap-2 mb-20 bg-[${theme?.colorPallete.primary}] border-[${theme?.colorPallete.accent}] border-2 rounded-md py-6 px-10 text-xl text-[${theme?.colorPallete.accent}] max-w-xl`}>
            <div>Czy napewno chcesz usunąć tempo do ćwiczenia <br/> <b>{selectedExercise.name}</b>?</div>
            <div className='flex gap-2'>
                <button onClick={HandleDeleteTempo} className='flex-1 bg-red-500 rounded-md py-2'>Usuń</button>
                <button onClick={()=>setShowDeleteTempoModal(false)} className='flex-1 bg-gray-500 rounded-md'>Anuluj</button>
            </div>
        </div>
    </BlurBackgroundModal>
  )
}
