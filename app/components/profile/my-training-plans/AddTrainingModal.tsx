'use client'
import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { WeekDayPL } from '@/app/types'
import { HideShowHTMLScrollbar, WeekDayArrayPL } from '@/app/lib/utils'
import { CreateUserTraining } from '@/app/actions'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Select } from '../../ui/SelectField'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

type AddTrainingModalTypes = {
    setShowAddModal :  React.Dispatch<React.SetStateAction<boolean>>,
    trainingCount: number,
}
export const AddTrainingModal = ({setShowAddModal,trainingCount}:AddTrainingModalTypes) => {
    const[trainingName,setTrainingName] = useState(`Mój Trening ${trainingCount+1}`)
    const[weekday,setWeekDay] = useState<WeekDayPL>('Poniedziałek')
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const AddTraining = async () => {
        setLoading(true)
        const isError = await CreateUserTraining(trainingName,weekday)
        if(isError && isError?.error){
            setLoading(false)
            return setError(isError.error)
        } 
        setShowAddModal(false)
        setLoading(false)
    }

    const HandleCloseModal = () => {
        setShowAddModal(false)
        HideShowHTMLScrollbar('show')
      }
  return (
    <BlurBackgroundModal>
        <div className={`text-xl rounded-md px-5 py-5 mb-20 w-full`}>
            <div className='flex flex-col gap-4'>
                <Input labelName='Nazwa treningu' onChange={e=>setTrainingName(e.target.value)} value={trainingName} disabled={loading}/>
                <Select onChange={e=>setWeekDay(e.target.value as WeekDayPL)} labelName='Dzień tygodnia' value={weekday} valuesToLoop={WeekDayArrayPL} disabled={loading}/>
            </div>

            <SmallLoaderDiv loading={loading}/>

            <div className='mt-5 flex gap-4'>
                <Button onClick={AddTraining} className='flex-1' isPrimary disabled={loading}>Dodaj</Button>
                <Button onClick={HandleCloseModal} className='flex-1' disabled={loading}>Anuluj</Button>
            </div>

            <ErrorDiv error={error}/>
        </div>
    </BlurBackgroundModal>
  )
}