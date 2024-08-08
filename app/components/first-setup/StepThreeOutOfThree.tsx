import React, { useState } from 'react'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { dataType } from './SetupOneOfThree'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    favouriteExercises: string[],
    setFavouriteExercises: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setFavouriteExercises,exercisesToDelete,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')

    const ValidateData = async () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error) return setError(validData.error)

        await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        //TODO REDIRECT USER
    }
    return (
    <div>
        <div className='text-white'>Zaznacz jakie ćwiczenia muszą być w Twoim planie:</div>
        <Mapper item={exerciseList} currentLevel={0} stateSetter={setFavouriteExercises} state={favouriteExercises} filterExercises={exercisesToDelete}/>
        <div>{error}</div>
        <button onClick={()=>ValidateData()}>Zakończ</button>
        <button onClick={()=>setCurrentStep(page=>page-1)}>Wstecz</button>
    </div>
    )
}
