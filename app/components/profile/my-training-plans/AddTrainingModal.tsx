'use client'
import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { WeekDay, WeekDayPL } from '@/app/types'
import { WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { CreateUserTraining } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'

type AddTrainingModalTypes = {
    setShowAddModal :  React.Dispatch<React.SetStateAction<boolean>>,
    trainingCount: number,
}
export const AddTrainingModal = ({setShowAddModal,trainingCount}:AddTrainingModalTypes) => {
    const theme = useContext(ThemeContext)
    const[trainingName,setTrainingName] = useState(`Mój Trening ${trainingCount+1}`)
    const[weekday,setWeekDay] = useState<WeekDayPL>('Poniedziałek')
    const[error,setError] = useState('')

    const AddTraining = async () => {
        const isError = await CreateUserTraining(trainingName,weekday)
        if(isError && isError?.error) return setError(isError.error)
        setShowAddModal(false)
    }
  return (
    <BlurBackgroundModal onClick={()=>setShowAddModal(false)}>
        <div onClick={e=>e.stopPropagation()} className={`text-xl border-2 rounded-md border-${theme?.colorPallete.accent} px-10 py-5 `}>
            <div className='flex flex-col gap-4'>
                <Input labelText='Nazwa treningu' handleChange={setTrainingName} value={trainingName}/>
                <Select handleChange={setWeekDay} labelText='Dzień tygodnia' value={weekday}/>
            </div>
            <div className='mt-5 flex gap-4'>
                <button onClick={AddTraining} className='flex-1 bg-green py-2 rounded-md'>Dodaj</button>
                <button onClick={()=>setShowAddModal(false)} className='flex-1 bg-red rounded-md py-2'>Anuluj</button>
            </div>
            {error && <div className='text-red-500'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}

type InputTypes = {
    labelText: string,
    value:string,
    handleChange: React.Dispatch<React.SetStateAction<string>>
}
const Input = ({labelText,value,handleChange}:InputTypes) => {
    const theme = useContext(ThemeContext)
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={labelText}>{labelText}</label>
            <input type="text" id={labelText} name='Nazwa treningu' onChange={e=>handleChange(e.target.value)} value={value} className={`rounded-md border-2 border-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} px-4 py-2 `}/>
        </div>
    )
}

type SelectTypes = {
    labelText: string,
    value:string,
    handleChange: React.Dispatch<React.SetStateAction<WeekDayPL>>
}

const Select = ({labelText,value,handleChange}:SelectTypes) => {
    const theme = useContext(ThemeContext)
    return(
        <div className='flex flex-col gap-2'>
            <label htmlFor={labelText}>{labelText}</label>
            <select name="Dzień tygodnia" id={labelText} value={value} defaultValue={WeekDayArray[0]} onChange={e=>handleChange(e.target.value as WeekDayPL)} className={`rounded-md border-2 border-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} px-4 py-2 `}>
                {WeekDayArrayPL.map(day=>(
                    <option value={day}>{day}</option>
                ))}
            </select>
        </div>
    )
}