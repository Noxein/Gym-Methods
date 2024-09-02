import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'

export const DeleteModal = ({selectedExercise,setShowDeleteModal}:{selectedExercise:UserExercise,setShowDeleteModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const theme = useContext(ThemeContext)
    const[error,setError]= useState('')
    const[isLoading,setIsLoading] = useState(false)

    const deleteExercise = async () => {
        setIsLoading(true)
        const isError = await DeleteUserExercise(selectedExercise.id)
        if(isError && isError.error){
            setIsLoading(false)
            return setError(isError.error)
        } 
        HandleCloseModal()
        setIsLoading(false)
    }
    const HandleCloseModal = () => {
        if(isLoading) return
        HideShowHTMLScrollbar('show')
        setShowDeleteModal(false)
    }
    return (
    <BlurBackgroundModal onClick={HandleCloseModal}>
        <div onClick={e=>e.stopPropagation()} className={`border-1 border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} px-10 py-6 rounded-md text-xl flex flex-col gap-2`}>
            <div className='text-center'>
                Czy napewno chcesz usunąć <br />
                <strong>{selectedExercise.exercisename}</strong>
            </div>
            {isLoading?
            <SmallLoader />:
            <div className='flex gap-2'>
                <button className='flex-1 bg-red py-2' onClick={deleteExercise}>Usuń</button>
                <button onClick={HandleCloseModal} className='flex-1 bg-gray-600'>Anuluj</button>
            </div>}
            {error && <div className='text-red-500'>${error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
