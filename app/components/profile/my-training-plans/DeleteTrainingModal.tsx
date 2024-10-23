import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserTrainingPlan } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteUserTraining } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'

type DeleteTrainingModalTypes = {
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    currentSelectedTraining: UserTrainingPlan | null | undefined,
}
export const DeleteTrainingModal = ({setShowDeleteModal,currentSelectedTraining}:DeleteTrainingModalTypes) => {
  const theme = useContext(ThemeContext)
  const[error,setError]= useState('')
  const[isLoading,setIsLoading] = useState(false)

  const deleteExercise = async () => {
    setIsLoading(true)
      const isError = await DeleteUserTraining(currentSelectedTraining?.id!)
      if(isError && isError.error){
        setIsLoading(false)
        return setError(isError.error)
      } 
      HandleCloseModal()
      setIsLoading(false)
  }
  const HandleCloseModal = () => {
    if(isLoading) return
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

            {isLoading?
            <SmallLoader/>:
            
            <div className='flex gap-4'>
              <Button onClick={deleteExercise} isPrimary className='flex-1'>Usuń</Button>
              <Button onClick={HandleCloseModal}  className='flex-1'>Anuluj</Button>
            </div>}

            <ErrorDiv error={error}/>
        </div>
    </BlurBackgroundModal>
  )
}
