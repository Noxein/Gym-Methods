import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { ThemeContext } from '@/app/context/ThemeContext'
import { AddNewUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

export const AddExercise = ({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const theme = useContext(ThemeContext)
    const[exerciseName,setExerciseName] = useState('')
    const[timeExercise,setTimeExercise] = useState(false)
    const[error,setError] = useState('')
    const hideModal = () => {
        setShowModal(x=>!x)
        HideShowHTMLScrollbar('show')
    }
    const addExercise = async () => {
        const isError = await AddNewUserExercise(exerciseName,timeExercise)
        if(isError && isError.error) return setError(isError.error)
        hideModal()
    }
  return (
        <BlurBackgroundModal onClick={hideModal}>
            <div className={`border-white border-1 bg-${theme?.colorPallete.primary} rounded-md flex flex-col px-10 py-4 gap-4 text-xl mb-20`} onClick={e=>e.stopPropagation()}>
                <input type="text" placeholder='Pompki' name="" id="" className={`px-2 py-1 rounded-md bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.accent} border-1`} onChange={e=>setExerciseName(e.target.value)}/>

                <div className='text-white'>
                    <input type="checkbox"  name="" id="time" value={JSON.stringify(timeExercise)} onChange={e=>setTimeExercise(e.target.checked)}/>
                    <label htmlFor="time" className='pl-2'>Ćwiczenie czasowe <span title='Ćwiczenie w którym liczy się czas, np Deska czy zwis na drążku'>O?</span></label>
                </div>
                <div className='flex justify-around text-white gap-2'>
                    <button className='bg-green flex-1 py-2' onClick={addExercise}>Dodaj</button>
                    <button onClick={hideModal} className='bg-red flex-1'>Anuluj</button>
                </div>
                {error && <div className='text-red'>{error}</div>}
            </div>
        </BlurBackgroundModal>
  )
}
