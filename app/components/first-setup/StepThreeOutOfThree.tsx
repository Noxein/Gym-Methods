import { useState } from 'react'
import { Mapper } from './Mapper'
import { exerciseList } from '@/app/lib/exercise-list'
import { SecondStepDataValidation } from '@/app/actions'
import { dataType } from './SetupOneOfThree'
import { Button } from '../ui/Button'
import { ErrorDiv } from '../ui/ErrorDiv'
import { useTranslations } from 'next-intl'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    favouriteExercises: string[],
    setExercisesToDelete: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
}

export const StepThreeOutOfThree = ({setCurrentStep,favouriteExercises,setExercisesToDelete,exercisesToDelete,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')

    const ValidateData = async () => {
        const validData = SecondStepDataValidation(favouriteExercises)
        if(validData && validData.error) return setError(e(validData.error))

        setCurrentStep(step=>step+1)
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    return (
    <div className='flex flex-col mx-5'>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>{t("ExercisesYouCantDo")}</h1>
        <div className='mb-24'>
            <Mapper item={exerciseList} currentLevel={0} stateSetter={setExercisesToDelete} state={exercisesToDelete} filterExercises={favouriteExercises} favourite={false}/>
        </div>
        
        <ErrorDiv error={error}/>

        <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 pb-5 bg-dark`}>
            <Button className='flex-1 text-2xl' onClick={()=>setCurrentStep(step=>step-1)}>{t("Back")}</Button>
            <Button className='flex-1 text-2xl' onClick={ValidateData} isPrimary >{t("Next")}</Button>
        </div>
    </div>
    )
}
