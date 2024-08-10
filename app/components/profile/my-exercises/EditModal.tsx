import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { EditUserExercise } from '@/app/actions'

export const EditModal = ({selectedExercise,setShowEditModal}:{selectedExercise:UserExercise,setShowEditModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [newName,setNewName] = useState(selectedExercise.exercicename)
    const[error,setError] = useState('')
    const theme = useContext(ThemeContext)

    const editExercise = async () => {
        const isError = await EditUserExercise(selectedExercise.id,newName)
        if(isError && isError.error) return setError(isError.error)
        setShowEditModal(false)
    }
  return (
    <BlurBackgroundModal onClick={()=>setShowEditModal(false)}>
        <div onClick={e=>e.stopPropagation()} className={`border-2 border-[${theme?.colorPallete.accent}] text-[${theme?.colorPallete.accent}] px-10 py-6 rounded-md text-xl flex flex-col gap-2`}>
            <input type="text" value={newName} onChange={e=>setNewName(e.target.value)} className={`px-2 py-1 bg-[${theme?.colorPallete.primary}] border-2 rounded-md border-[${theme?.colorPallete.accent}] text-[${theme?.colorPallete.accent}]`}/>
            <div className='flex gap-2'>
                <button className='flex-1 bg-green-600 py-2' onClick={editExercise}>Zapisz</button>
                <button onClick={()=>setShowEditModal(false)} className='flex-1 bg-red-600'>Anuluj</button>
            </div>
            {error && <div className='bg-red-500'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
