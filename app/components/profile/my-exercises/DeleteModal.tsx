import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'
import { Button } from '../../ui/Button'

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
    <BlurBackgroundModal>
        <div onClick={e=>e.stopPropagation()} className={`text-white px-5 py-6 rounded-md text-xl flex flex-col gap-2 w-full`}>
            <div className='text-center'>
                Czy napewno chcesz usunąć <br />
                <strong>{selectedExercise.exercisename}</strong>
            </div>
            {isLoading?
            <SmallLoader />:
            <div className='flex gap-2'>
                <Button onClick={deleteExercise} className='flex-1' isPrimary>Usuń</Button>
                {/* <button className='flex-1 bg-red py-2' onClick={deleteExercise}>Usuń</button>
                <button onClick={HandleCloseModal} className='flex-1 bg-gray-600'>Anuluj</button> */}
                <Button onClick={HandleCloseModal} className='flex-1'>Anuluj</Button>
            </div>}
            {error && <div className='text-red-500'>${error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
