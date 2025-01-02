'use client'
import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { WeekDay, WeekDayPL } from '@/app/types'
import { HideShowHTMLScrollbar, WeekDayArray } from '@/app/lib/utils'
import { CreateUserTraining } from '@/app/actions'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Select } from '../../ui/SelectField'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { useTranslations } from 'next-intl'
import { SmallLoader } from '../../Loading/SmallLoader'

type AddTrainingModalTypes = {
    setShowAddModal :  React.Dispatch<React.SetStateAction<boolean>>,
    trainingCount: number,
}
export const AddTrainingModal = ({setShowAddModal,trainingCount}:AddTrainingModalTypes) => {
    const[trainingName,setTrainingName] = useState(`Mój Trening ${trainingCount+1}`)
    const[weekday,setWeekDay] = useState<WeekDay>('Monday')
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const AddTraining = async () => {
        setLoading(true)
        const isError = await CreateUserTraining(trainingName,weekday)
        if(isError && isError?.error){
            setLoading(false)
            return setError(e(isError.error))
        } 
        setShowAddModal(false)
        setLoading(false)
    }

    const HandleCloseModal = () => {
        setShowAddModal(false)
        HideShowHTMLScrollbar('show')
      }

    const t = useTranslations("Home/Profile/My-Training-Plans")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")
    
  return (
    <BlurBackgroundModal>
        <div className={`text-xl rounded-md px-5 py-5 mb-20 w-full`}>
            <div className='flex flex-col gap-4'>
                <Input labelName={t("TrainingName")} onChange={e=>setTrainingName(e.target.value)} value={trainingName} disabled={loading}/>
                <Select onChange={e=>setWeekDay(e.target.value as WeekDay)} labelName={t("DayOfWeek")} value={weekday} valuesToLoop={WeekDayArray} disabled={loading}/>
            </div>

            <SmallLoader loading={loading}/>

            <div className='mt-5 flex gap-4'>

                <Button onClick={HandleCloseModal} className='flex-1' disabled={loading}>{u("Cancel")}</Button>
                <Button onClick={AddTraining} className='flex-1' isPrimary disabled={loading}>{u("Add")}</Button>
                
            </div>

            <ErrorDiv error={error}/>
        </div>
    </BlurBackgroundModal>
  )
}