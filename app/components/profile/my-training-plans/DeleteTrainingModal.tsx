import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserTraining } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteUserTraining } from '@/app/actions'

type DeleteTrainingModalTypes = {
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    currentSelectedTraining: UserTraining | null | undefined,
}
export const DeleteTrainingModal = ({setShowDeleteModal,currentSelectedTraining}:DeleteTrainingModalTypes) => {
  const theme = useContext(ThemeContext)
  const[error,setError]= useState('')
  const deleteExercise = async () => {
      const isError = await DeleteUserTraining(currentSelectedTraining?.id!)
      if(isError && isError.error) return setError(isError.error)
      setShowDeleteModal(false)
  }
  return (
    <BlurBackgroundModal onClick={()=>setShowDeleteModal(false)}>
        <div onClick={e=>e.stopPropagation()} className={`border-2 border-[${theme?.colorPallete.accent}] text-[${theme?.colorPallete.accent}] px-10 py-6 rounded-md text-xl flex flex-col gap-2 mb-20`}>
        <div className='text-center'>
                Czy napewno chcesz usunąć <br />
                <strong>{currentSelectedTraining?.trainingname}</strong>
            </div>
            <div className='flex gap-2'>
                <button className='flex-1 bg-red-600 py-2' onClick={deleteExercise}>Usuń</button>
                <button onClick={()=>setShowDeleteModal(false)} className='flex-1 bg-gray-600'>Anuluj</button>
            </div>
            {error && <div className='text-red-500'>${error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
