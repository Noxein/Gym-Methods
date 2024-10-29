import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { AddNewUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { CheckBox } from '../../ui/CheckBox'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

export const AddExercise = ({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const[exerciseName,setExerciseName] = useState('')

    const[timeExercise,setTimeExercise] = useState(false)
    const[usesHandle,setUsesHandle] = useState(false)

    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const hideModal = () => {
        setShowModal(x=>!x)
        HideShowHTMLScrollbar('show')
    }
    const addExercise = async () => {
        setLoading(true)
        const isError = await AddNewUserExercise(exerciseName,timeExercise,usesHandle)
        if(isError && isError.error){
            setLoading(false)
            return setError(isError.error)
        }
        setLoading(false)
        hideModal()
    }
  return (
        <BlurBackgroundModal>
            <div className={`rounded-md flex flex-col px-10 py-4 gap-4 text-xl mb-20 w-full mx-5 text-white`} onClick={e=>e.stopPropagation()}>
                <Input labelName='Nazwa ćzwiczenia' value={exerciseName} onChange={e=>setExerciseName(e.target.value)} disabled={loading}/>
                <ErrorDiv error={error}/>

                <CheckBox labelText='Czy jest to ćwiczenie w którym mierzy sie czas? (np. Deska)' onChange={e=>setTimeExercise(e.target.checked)} checked={timeExercise} disabled={loading}/>
                <CheckBox labelText='Czy to ćwiczenie wykorzysuje uchwyty (np. Ćwiczenia na wyciągu)' onChange={e=>setUsesHandle(e.target.checked)} checked={usesHandle} disabled={loading}/>
                
                <SmallLoaderDiv loading={loading}/>
                <div className='flex justify-around text-white gap-2'>

                    <Button onClick={hideModal} className='flex-1' disabled={loading}>Anuluj</Button>
                    <Button onClick={addExercise} isPrimary className='flex-1' disabled={loading}>Dodaj</Button>
                    
                </div>

                
            </div>
        </BlurBackgroundModal>
  )
}
