import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { EditUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'

export const EditModal = ({selectedExercise,setShowEditModal}:{selectedExercise:UserExercise,setShowEditModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [newName,setNewName] = useState(selectedExercise.exercisename)
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const theme = useContext(ThemeContext)

    const editExercise = async () => {
        setIsLoading(true)
        const isError = await EditUserExercise(selectedExercise.id,newName)
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
        setShowEditModal(false)
    }
  return (
    <BlurBackgroundModal onClick={HandleCloseModal}>
        <div onClick={e=>e.stopPropagation()} className={`border-[1px] border-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} px-10 py-6 rounded-md text-xl flex flex-col gap-2`}>
            <input type="text" value={newName} onChange={e=>setNewName(e.target.value)} className={`px-2 py-1 bg-${theme?.colorPallete.primary} border-[1px] rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
            {isLoading?
            <SmallLoader/>:
            <div className='flex gap-2'>
                <button className='flex-1 bg-green py-2 rounded-lg' onClick={editExercise}>Zapisz</button>
                <button onClick={HandleCloseModal} className='flex-1 bg-red rounded-lg'>Anuluj</button>
            </div>}
            {error && <div className='text-red'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
