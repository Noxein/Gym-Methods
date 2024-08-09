import React, { useState } from 'react'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { dataType } from './SetupOneOfThree'
import { useRouter } from 'next/navigation'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    favouriteExercises: string[],
    setFavouriteExercises: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setFavouriteExercises,exercisesToDelete,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')
    const router = useRouter()

    const ValidateData = async () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error) return setError(validData.error)

        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error) return setError('Coś poszło nie tak')
        console.log(data)
        //TODO REDIRECT USER
        router.push('/home')
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
