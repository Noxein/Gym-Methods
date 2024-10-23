import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { EditUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { SmallLoader } from '../../Loading/SmallLoader'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { CheckBox } from '../../ui/CheckBox'

interface EditModal {
    selectedExercise:UserExercise,
    setShowEditModal:React.Dispatch<React.SetStateAction<boolean>>,
}

export const EditModal = ({selectedExercise,setShowEditModal}:EditModal) => {
    const[newName,setNewName] = useState(selectedExercise.exercisename)
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const[timeExercise,setTimeExercise] = useState(selectedExercise.timemesure)
    const[usesHandle,setUsesHandle] = useState(selectedExercise.useshandle)

    const editExercise = async () => {
        setIsLoading(true)
        const isError = await EditUserExercise(selectedExercise.id,newName,timeExercise,usesHandle)
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
    console.log(selectedExercise,timeExercise)
  return (
    <BlurBackgroundModal>
        <div onClick={e=>e.stopPropagation()} className={`text-white px-5 py-6 rounded-md text-xl flex flex-col gap-4 w-full`}>
            <Input labelName='Nazwa ćwiczenia' value={newName} onChange={e=>setNewName(e.target.value)}/>

            <CheckBox labelText='Czy jest to ćwiczenie w którym mierzy sie czas? (np. Deska)' onChange={e=>setTimeExercise(e.target.checked)} checked={timeExercise}/>
            <CheckBox labelText='Czy to ćwiczenie wykorzysuje uchwyty (np. Ćwiczenia na wyciągu)' onChange={e=>setUsesHandle(e.target.checked)} checked={usesHandle}/>

            {isLoading?
            <SmallLoader/>:
            <div className='flex gap-4'>
                <Button isPrimary className='flex-1' onClick={editExercise}>Zapisz</Button>
                <Button className='flex-1' onClick={HandleCloseModal}>Anuluj</Button>
            </div>}
            {error && <div className='text-red'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
