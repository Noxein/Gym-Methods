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
    setFavouriteExercises: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setFavouriteExercises,exercisesToDelete,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')
    const router = useRouter()
    const theme = useContext(ThemeContext)

    const ValidateData = async () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData.error) return setError(validData.error)
        
        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error) return setError('Coś poszło nie tak')

        router.push('/home')
    }
    return (
    <div className='mb-24 mx-5 '>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>Zaznacz jakie ćwiczenia <br/> muszą być w Twoim planie:</h1>
        <Mapper item={exerciseList} currentLevel={0} stateSetter={setFavouriteExercises} state={favouriteExercises} filterExercises={exercisesToDelete} favourite={true}/>
        <div>{error}</div>
        <div className={`fixed bottom-0 left-0 right-0 gap-2 flex mx-5 mb-5 bg-${theme?.colorPallete.primary}`}>
            <button onClick={()=>ValidateData()} className={`flex-1 text-white bg-green py-3 rounded-lg font-semibold text-2xl`}>Zakończ</button>
            <button onClick={()=>setCurrentStep(page=>page-1)} className='flex-1 text-white bg-red py-3 rounded-lg font-semibold text-2xl'>Wstecz</button>
        </div>
    </div>
    )
}
