import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserTrainingPlan } from '@/app/types'
import { DeleteUserTraining } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

type DeleteTrainingModalTypes = {
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    currentSelectedTraining: UserTrainingPlan | null | undefined,
}
export const DeleteTrainingModal = ({setShowDeleteModal,currentSelectedTraining}:DeleteTrainingModalTypes) => {
  const[error,setError]= useState('')
  const[loading,setLoading] = useState(false)

  const deleteExercise = async () => {
    setLoading(true)

    const isError = await DeleteUserTraining(currentSelectedTraining?.id!)

    if(isError && isError.error){
      setLoading(false)
      return setError(isError.error)
    } 

    HandleCloseModal()
    setLoading(false)

  }
  const HandleCloseModal = () => {
    setShowDeleteModal(false)
    HideShowHTMLScrollbar('show')
  }
  return (
    <BlurBackgroundModal>
        <div className={`text-white px-5 py-6 rounded-md text-xl flex flex-col gap-4 mb-20 w-full`}>

          <div className='text-center'>
            Czy napewno chcesz usunąć <br />
            <strong>{currentSelectedTraining?.trainingname}</strong>
          </div>

          <SmallLoaderDiv loading={loading}/>
            
          <div className='flex gap-4'>

            <Button onClick={HandleCloseModal}  className='flex-1' disabled={loading}>Anuluj</Button>
            <Button onClick={deleteExercise} isPrimary className='flex-1' disabled={loading}>Usuń</Button>
            
          </div>

          <ErrorDiv error={error}/>

      </div>
    </BlurBackgroundModal>
  )
}
