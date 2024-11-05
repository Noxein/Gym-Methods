'use client'

import { LocalStorageTraining } from "@/app/types"
import { addHours } from "date-fns"
import { useState } from "react"
import { BlurBackgroundModal } from "../BlurBackgroundModal"
import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { Button } from "../ui/Button"
import { SaveTrainingToDatabase } from "@/app/actions"
import { ErrorDiv } from "../ui/ErrorDiv"

export const OpenTrainingRemainder = () => {
    const trainings = {...localStorage}
    const[showSelf,setShowSelf] = useState(true)
    const func = () => {
        let array = []
        for(const [key,value] of Object.entries(trainings)){
            if(!key.includes('training')) continue

            const parsedOjbect = JSON.parse(value) as LocalStorageTraining
            
            if(addHours(new Date(parsedOjbect.trainingStartDate),8) <= new Date()){
                array.push(key.slice(0,key.length-8))
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
        setShowSelf(false) 
        HideShowHTMLScrollbar('show')
    }

  if(showSelf && data.length > 0) return (
    <BlurBackgroundModal>
        <div className="text-white mx-5 mb-20">
            <p className="text-2xl text-center">Masz niezakończone treningi z przed ponad 8 godzin</p>
            <div className="mt-5 flex flex-col gap-5">
                {data.map(name=>(
                    <ExerciseToClose name={name} setData={setData}/>
                ))}
            </div>
            <div className="w-full flex mt-5">
                <Button className="flex-1" onClick={handleClose}>Zamknij</Button>
            </div>
        </div>
    </BlurBackgroundModal>
  )
}

type ExerciseToCloseTypes = {
    name: string,
    setData: React.Dispatch<React.SetStateAction<string[]>>
}

const ExerciseToClose = ({name,setData}:ExerciseToCloseTypes) => {
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState('')

    const handleCloseTraining = async () => {
        setLoading(true)
        const storagedata = localStorage.getItem(name+'training')
        const localStorageTrainingData = JSON.parse(storagedata!)

        const data = await SaveTrainingToDatabase(localStorageTrainingData.trainingId,localStorageTrainingData.exercises,localStorageTrainingData.trainingStartDate)
        if(data && data.error){
            setLoading(false)
            return setError(data.error)
        }
        localStorage.removeItem(name+'training')
        setData(x=>x.filter(y=>y!==name))
        setLoading(false)
    }
    return (
        <div className="flex justify-between rounded-lg items-center h-10 gap-4">
            <p className="bg-dark border-1 border-marmur flex-1 h-full flex items-center pl-4 rounded-lg">{name}</p>
            <ErrorDiv error={error}/>
            <Button className="py-2 my-2 mr-2 px-2" isPrimary onClick={handleCloseTraining} disabled={loading}>Zamknij trening</Button>
        </div>
    )
}