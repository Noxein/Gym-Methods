'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/Button'
import { dataType } from './SetupOneOfThree'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { ErrorDiv } from '../ui/ErrorDiv'
import { useTranslations } from 'next-intl'

interface FinalStep {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    exercisesToDelete: string[],
    setFavouriteExercises: React.Dispatch<React.SetStateAction<string[]>>,
    favouriteExercises: string[],
    notfavouriteExercises: string[],
    data: dataType,
}

export const FinalStep = ({data,exercisesToDelete,favouriteExercises,notfavouriteExercises,setCurrentStep,setFavouriteExercises}:FinalStep) => {
    const router = useRouter()
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)
    
    const ValidateData = async () => {
        setLoading(true)


        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData && validData.error){
            setLoading(false)
            return setError(e(validData.error))
        } 
        
        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error){
            setLoading(false)
            return setError(e(sendData.error))
        }
       
        setLoading(false)
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

  return (
    <div className='mb-24 mx-5 '>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>{t("ExercisesYouWantToDo1/2")} <br/> {t("ExercisesYouWantToDo2/2")}</h1>

        <Mapper item={exerciseList} currentLevel={0} stateSetter={setFavouriteExercises} state={favouriteExercises} filterExercises={exercisesToDelete} favourite={true} disableFuncitions={loading}/>

        <ErrorDiv error={error}/>

        <div className={`fixed bottom-0 left-0 right-0 gap-2 flex mx-5 pb-5 bg-dark`}>
            <Button className='flex-1 text-2xl' onClick={()=>setCurrentStep(step=>step-1)} disabled={loading}>{t("Back")}</Button>
            <Button className='flex-1 text-2xl' onClick={async()=>{ValidateData()}} isPrimary disabled={loading}>{t("Finish")}</Button>
        </div>
    </div>
  )
}

