import React, { useState } from 'react'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { SecondStepDataValidation } from '@/app/actions'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    favouriteExercises: string[],
    setFavouriteExercises: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setFavouriteExercises,exercisesToDelete}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')

    const ValidateData = () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error) return setError(validData.error)
        //TODO REDIRECT USER
    }
    return (
    <div>
        <div className='text-white'>Zaznacz jakie ćwiczenia muszą być w Twoim planie:</div>
        <Mapper item={exerciseList} currentLevel={0} stateSetter={setFavouriteExercises} state={favouriteExercises} filterExercises={exercisesToDelete}/>
        <div>{error}</div>
        <button onClick={()=>ValidateData()}>Dalej</button>
        <button onClick={()=>setCurrentStep(page=>page-1)}>Wstecz</button>
    </div>
    )
}
