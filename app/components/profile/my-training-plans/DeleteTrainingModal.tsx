import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserTrainingPlan } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteUserTraining } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'

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
    <BlurBackgroundModal onClick={HandleCloseModal}>
        <div onClick={e=>e.stopPropagation()} className={`border-2 border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} px-10 py-6 rounded-md text-xl flex flex-col gap-2 mb-20`}>
        <div className='text-center'>
                Czy napewno chcesz usunąć <br />
                <strong>{currentSelectedTraining?.trainingname}</strong>
            </div>
            {isLoading?
            <SmallLoader/>:
            <div className='flex gap-2'>
                <button className='flex-1 bg-red py-2' onClick={deleteExercise}>Usuń</button>
                <button onClick={HandleCloseModal} className='flex-1 bg-gray-600'>Anuluj</button>
            </div>}
            {error && <div className='text-red-500'>${error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
