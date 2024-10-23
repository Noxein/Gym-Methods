'use client'
import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { WeekDayPL } from '@/app/types'
import { HideShowHTMLScrollbar, WeekDayArrayPL } from '@/app/lib/utils'
import { CreateUserTraining } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import { SmallLoader } from '../../Loading/SmallLoader'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Select } from '../../ui/SelectField'

type AddTrainingModalTypes = {
    setShowAddModal :  React.Dispatch<React.SetStateAction<boolean>>,
    trainingCount: number,
}
export const AddTrainingModal = ({setShowAddModal,trainingCount}:AddTrainingModalTypes) => {
    const theme = useContext(ThemeContext)
    const[trainingName,setTrainingName] = useState(`Mój Trening ${trainingCount+1}`)
    const[weekday,setWeekDay] = useState<WeekDayPL>('Poniedziałek')
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)

    const AddTraining = async () => {
        setIsLoading(true)
        const isError = await CreateUserTraining(trainingName,weekday)
        if(isError && isError?.error){
            setIsLoading(false)
            return setError(isError.error)
        } 
        setShowAddModal(false)
        setIsLoading(false)
    }

    const HandleCloseModal = () => {
        if(isLoading) return
        setShowAddModal(false)
        HideShowHTMLScrollbar('show')
      }
  return (
    <BlurBackgroundModal>
        <div className={`text-xl rounded-md px-5 py-5 mb-20 w-full`}>
            <div className='flex flex-col gap-4'>
                <Input labelName='Nazwa treningu' onChange={e=>setTrainingName(e.target.value)} value={trainingName}/>
                <Select onChange={e=>setWeekDay(e.target.value as WeekDayPL)} labelName='Dzień tygodnia' value={weekday} valuesToLoop={WeekDayArrayPL}/>
            </div>

            {isLoading?
            <SmallLoader sClass='mt-5'/>:
            <div className='mt-5 flex gap-4'>
                <Button onClick={AddTraining} className='flex-1' isPrimary>Dodaj</Button>
                <Button onClick={HandleCloseModal} className='flex-1'>Anuluj</Button>
            </div>}

            <ErrorDiv error={error}/>
        </div>
    </BlurBackgroundModal>
  )
}

// type SelectTypes = {
//     labelText: string,
//     value:string,
//     handleChange: React.Dispatch<React.SetStateAction<WeekDayPL>>
// }

// const Select = ({labelText,value,handleChange}:SelectTypes) => {
//     const theme = useContext(ThemeContext)
//     return(
//         <div className='flex flex-col gap-2'>
//             <label htmlFor={labelText}>{labelText}</label>
//             <select name="Dzień tygodnia" id={labelText} value={value} onChange={e=>handleChange(e.target.value as WeekDayPL)} className={`rounded-md border-2 border-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} px-4 py-2 `}>
//                 {WeekDayArrayPL.map(day=>(
//                     <option value={day} key={day}>{day}</option>
//                 ))}
//             </select>
//         </div>
//     )
// }