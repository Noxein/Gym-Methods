'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/Button'
import { dataType } from './SetupOneOfThree'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { createTrainingPlans, FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/app/context/ThemeContext'

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
    const theme = useContext(ThemeContext)
    
    const ValidateData = async () => {
        setLoading(true)
        await createTrainingPlans(favouriteExercises,notfavouriteExercises,Number(data.daysexercising))
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error){
            setLoading(false)
            return setError(validData.error)
        } 
        
        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error){
            setLoading(false)
            return setError('Coś poszło nie tak')
        }
        setLoading(false)
        router.push('/home')
    }
  return (
    <div className='mb-24 mx-5 '>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>Zaznacz jakie ćwiczenia <br/> muszą być w Twoim planie:</h1>
        <Mapper item={exerciseList} currentLevel={0} stateSetter={setFavouriteExercises} state={favouriteExercises} filterExercises={exercisesToDelete} favourite={true} disableFuncitions={loading}/>
        <div className='text-white'>{error}</div>
        <div className={`fixed bottom-0 left-0 right-0 gap-2 flex mx-5 pb-5 bg-${theme?.colorPallete.primary}`}>
            <Button className='flex-1 text-2xl' onClick={()=>setCurrentStep(step=>step-1)} disabled={loading}>Wstecz</Button>
            <Button className='flex-1 text-2xl' onClick={async()=>{ValidateData()}} isPrimary disabled={loading}>Zakończ</Button>
        </div>
    </div>
  )
}

