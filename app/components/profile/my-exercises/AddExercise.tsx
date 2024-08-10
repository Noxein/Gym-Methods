import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { ThemeContext } from '@/app/context/ThemeContext'
import { AddNewUserExercise } from '@/app/actions'

export const AddExercise = ({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const theme = useContext(ThemeContext)
    const[exerciseName,setExerciseName] = useState('')
    const[error,setError] = useState('')
    const hideModal = () => {
        setShowModal(x=>!x)
    }
    const addExercise = async () => {
        const isError = await AddNewUserExercise(exerciseName)
        if(isError && isError.error) return setError(isError.error)
            hideModal()
    }
  return (
        <BlurBackgroundModal onClick={hideModal}>
            <div className='border-white border-2 rounded-md flex flex-col px-10 py-4 gap-4 text-xl mb-20' onClick={e=>e.stopPropagation()}>
                <input type="text" placeholder='Pompki' name="" id="" className={`px-2 py-1 rounded-md bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.accent}] border-2`} onChange={e=>setExerciseName(e.target.value)}/>
                <div className='flex justify-around text-white gap-2'>
                    <button className='bg-green-600 flex-1 py-2' onClick={addExercise}>Dodaj</button>
                    <button onClick={hideModal} className='bg-red-600 flex-1'>Anuluj</button>
                </div>
                {error && <div className='text-red-500'>{error}</div>}
            </div>
        </BlurBackgroundModal>
  )
}
