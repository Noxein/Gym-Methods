import React, { useContext, useState } from 'react'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { dataType } from './SetupOneOfThree'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/app/context/ThemeContext'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    favouriteExercises: string[],
    setExercisesToDelete: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setExercisesToDelete,exercisesToDelete,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')
    const router = useRouter()
    const theme = useContext(ThemeContext)

    const ValidateData = async () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error) return setError(validData.error)

        setCurrentStep(step=>step+1)
    }
    return (
    <div className='flex flex-col mx-5'>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>Zaznacz jakich ćwiczeń nie możesz/nie chcesz wykonywać:</h1>
        <div className='mb-24'>
            <Mapper item={exerciseList} currentLevel={0} stateSetter={setExercisesToDelete} state={exercisesToDelete} filterExercises={favouriteExercises} favourite={false}/>
        </div>
        
        <div className='text-red-500'>{error}</div>
        <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 py-5 bg-${theme?.colorPallete.primary}`}>
            <button onClick={ValidateData} className='flex-1 text-white bg-green py-3 rounded-lg font-semibold text-2xl'>Dalej</button>
            <button onClick={()=>setCurrentStep(step=>step-1)} className='flex-1 text-white bg-red py-3 rounded-lg font-semibold text-2xl'>Wstecz</button>
        </div>
    </div>
    )
}
