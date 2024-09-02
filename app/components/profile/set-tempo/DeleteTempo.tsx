import { SelectedExerciseWithTempo } from '@/app/types'
import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type DeleteTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteTempo = ({selectedExercise,setShowDeleteTempoModal}:DeleteTempoType) => {
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const theme = useContext(ThemeContext)

    const HandleDeleteTempo = async () => {
        setIsLoading(true)
        const isError = await DeleteTempoFromDb(selectedExercise.id)
        if(isError && isError.error){
            setIsLoading(false)
            return setError(isError.error)
        } 
        setIsLoading(false)
        HandleCloseModal()
    }

    const HandleCloseModal = () => {
        if(isLoading) return
        HideShowHTMLScrollbar('show')
        setShowDeleteTempoModal(false)
    }
  return (
    <BlurBackgroundModal onClick={HandleCloseModal}>
        <div onClick={e=>e.stopPropagation()} className={`flex flex-col gap-2 mx-5 mb-20 bg-${theme?.colorPallete.primary} border-${theme?.colorPallete.accent} border-[1px] rounded-md py-6 px-10 text-xl text-${theme?.colorPallete.accent} max-w-xl`}>
            <div className='text-center'>Czy napewno chcesz usunąć tempo do ćwiczenia <br/> <b>{selectedExercise.name}</b>?</div>
            {isLoading?            
            <div className='flex justify-center mt-4'>
                <span className='loader1'></span>
            </div>:
            <div className='flex gap-2 mt-4'>
                <button onClick={HandleDeleteTempo} className='flex-1 bg-red rounded-md py-2'>Usuń</button>
                <button onClick={HandleCloseModal} className='flex-1 bg-gray-500 rounded-md'>Anuluj</button>
            </div>}
        </div>
    </BlurBackgroundModal>
  )
}
