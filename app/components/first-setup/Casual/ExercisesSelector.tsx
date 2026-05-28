"use client"
import { useState } from 'react'
import { exerciseList } from '@/app/lib/exercise-list'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { dataType } from './Goal'
import { Button } from '@/app/components/ui/Button'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { FirstSetupSelectedSteps } from '@/app/types'
import { Mapper } from './Mapper'
import { DefaultExercisesMap } from '../../ui/DefaultExercisesMap'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupSelectedSteps>>,
    favouriteExercises: string[],
    setExercises: React.Dispatch<React.SetStateAction<string[]>>,
    exercisesToDelete: string[],
    data: dataType,
    isFav?: boolean
}

export const ExercisesSelector = ({setCurrentStep,favouriteExercises,setExercises,exercisesToDelete,data,isFav}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')

    const ValidateData = async () => {
        const validData = await SecondStepDataValidation(favouriteExercises)
        if(validData && validData.error) return setError(e(validData.error))

        const result = await FirstSetupFinish(data,favouriteExercises,exercisesToDelete)
        if(result && result.error) return setError(e(result.error))
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    const handleExerciseClick = (exercisename:string) => {
        if(isFav){
            if(favouriteExercises.includes(exercisename)){
                setExercises(favouriteExercises.filter(e=>e!==exercisename))
            } else {
                setExercises([...favouriteExercises,exercisename])
            }
        }else{
            if(exercisesToDelete.includes(exercisename)){
                setExercises(exercisesToDelete.filter(e=>e!==exercisename))
            } else {
                setExercises([...exercisesToDelete,exercisename])
            }
        }

    }

    const message = isFav ? t("ExercisesYouCanDo") : t("ExercisesYouCantDo")

    const nextStep = () => isFav ? setCurrentStep('not-fav-exercises') : ValidateData()
    const prevStep = () => isFav ? setCurrentStep('training-creator') : setCurrentStep('fav-exercises')
    
    return (
    <div className='flex flex-col mx-5'>
        <h1 className='text-white font-bold text-xl text-center mt-20 mb-10'>
            {message}
        </h1>
        <div className='mb-24'>
            <DefaultExercisesMap item={exerciseList} clickHandler={handleExerciseClick} childrenIcons={
                <Icon className="flex items-center px-1">
                    <PlusIcon fill="#fff"/>
                </Icon>}

                favouriteExercises={favouriteExercises}
                exercisesToDelete={exercisesToDelete}
                isFav={isFav}
                />
        </div>
        
        <ErrorDiv error={error}/>

        <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 pb-5 bg-dark`}>
            <Button className='flex-1 text-2xl' onClick={prevStep}>{t("Back")}</Button>
            <Button className='flex-1 text-2xl' onClick={nextStep} isPrimary >{t("Next")}</Button>
        </div>
    </div>
    )
}
