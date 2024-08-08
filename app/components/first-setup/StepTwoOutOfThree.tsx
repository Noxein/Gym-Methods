import { ThemeContext } from '@/app/context/ThemeContext'
import { ExpandIcon } from '@/app/ui/icons/ExpandIcon'
import React, { useContext, useState } from 'react'
import { exerciseList } from '@/app/lib/exercise-list'
import { Mapper } from './Mapper'
import { SecondStepDataValidation } from '@/app/actions'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    exercisesToDelete: string[],
    setExercisesToDelete: React.Dispatch<React.SetStateAction<string[]>>,
    favouriteExercises: string[],
}
export const StepTwoOutOfThree = ({setCurrentStep,exercisesToDelete,setExercisesToDelete,favouriteExercises}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')

    const ValidateData = () => {
        const validData = SecondStepDataValidation(exercisesToDelete)
        if(validData.error) return setError(validData.error)
        setCurrentStep(page=>page+1)
    }
    return (
        <div>
            <div className='text-white'>Zaznacz jakich ćwiczeń nie możesz/nie chcesz wykonywać:</div>
            <Mapper item={exerciseList} currentLevel={0} stateSetter={setExercisesToDelete} state={exercisesToDelete} filterExercises={favouriteExercises}/>
            <div className='text-red-500'>{error}</div>
            <div>
                <button onClick={()=>ValidateData()}>Dalej</button>
                <button onClick={()=>setCurrentStep(page=>page-1)}>Wstecz</button>
            </div>
        </div>
    )
}
