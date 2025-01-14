'use client'

import { LocalStorageTraining } from "@/app/types"
import { addHours } from "date-fns"
import { useState } from "react"
import { BlurBackgroundModal } from "../BlurBackgroundModal"
import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { Button } from "../ui/Button"
import { SaveTrainingToDatabase } from "@/app/actions"
import { ErrorDiv } from "../ui/ErrorDiv"
import { useTranslations } from "next-intl"

type OpenTrainingRemainderTypes = {
    useremail?: string | null
}
export const OpenTrainingRemainder = ({useremail}:OpenTrainingRemainderTypes) => {

    const resetStorageFunc = () => {
        const isReset = localStorage.getItem('reset')
        if(isReset) return
        localStorage.clear()
        localStorage.setItem('reset',JSON.stringify({reset:true}))
    }

    resetStorageFunc()
    const trainings = {...localStorage}
    const[showSelf,setShowSelf] = useState(true)

    const func = () => {
        const userCloseDelay = localStorage.getItem('TrainingReminderDelay')

        if(userCloseDelay){
            const parsedDelay = JSON.parse(userCloseDelay)
            const now = new Date()
            if(!(now.getTime() > addHours(new Date(parsedDelay),8).getTime())) return [] // if it has been more than 8 hours since last reminder, remind again else return []
        }

        let array = []
        for(const [key,value] of Object.entries(trainings)){
            if(!key.includes('training') || !key.includes(useremail!)){
                continue
            }

            const parsedOjbect = JSON.parse(value) as LocalStorageTraining
            
            if(addHours(new Date(parsedOjbect.trainingStartDate),8) <= new Date()){
                array.push(key.slice(0,key.length-(8 + useremail?.length!)))
            }
        }
        if(array.length>0){
            setShowSelf(true)
            HideShowHTMLScrollbar('hide')
        }else{
            setShowSelf(false) 
            HideShowHTMLScrollbar('show')
        }
        return array 
    }
    const [data,setData] = useState(()=>func())
    
    const handleClose = () => {
        localStorage.setItem('TrainingReminderDelay',JSON.stringify(new Date()))
        setShowSelf(false) 
        HideShowHTMLScrollbar('show')
    }

    const t = useTranslations('Home')

  if(showSelf && data.length > 0) return (
    <BlurBackgroundModal>
        <div className="text-white mx-5 mb-20">
            <p className="text-2xl text-center">{t('OpenTrainings')}</p>
            <div className="mt-5 flex flex-col gap-5">
                {data.map(name=>(
                    <ExerciseToClose key={name} name={name} setData={setData} email={useremail}/>
                ))}
            </div>
            <div className="w-full flex mt-5">
                <Button className="flex-1" onClick={handleClose}>{t("RemindLater")}</Button>
            </div>
        </div>
    </BlurBackgroundModal>
  )
}

type ExerciseToCloseTypes = {
    name: string,
    setData: React.Dispatch<React.SetStateAction<string[]>>,
    email?: string | null,
}

const ExerciseToClose = ({name,setData,email}:ExerciseToCloseTypes) => {
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState('')

    const t = useTranslations('Home')

    const handleCloseTraining = async () => {
        setLoading(true)
        const storagedata = localStorage.getItem(name+'training'+email)
        const localStorageTrainingData = JSON.parse(storagedata!)

        const data = await SaveTrainingToDatabase(localStorageTrainingData.trainingId,localStorageTrainingData.exercises,localStorageTrainingData.trainingStartDate)
        if(data && data.error){
            setLoading(false)
            return setError(data.error)
        }
        localStorage.removeItem(name+'training'+email)
        setData(x=>x.filter(y=>y!==name))
        setLoading(false)
    }
    return (
        <div className="flex flex-col rounded-lg gap-1">
            <div className="grid grid-cols-[2fr,1fr] gap-2">
                <p className="bg-dark border-1 border-marmur flex-1 flex items-center px-4 rounded-lg py-2">{name}</p>
                <Button className="py-2 mr-2 px-2 justify-stretch items-stretch" isPrimary onClick={handleCloseTraining} disabled={loading}>{t('CloseTraining')}</Button>
            </div>
            <ErrorDiv error={error} className="bg-dark text-red border-darkLight border-2 rounded-lg px-2 py-2 mt-1"/>
        </div>
    )
}