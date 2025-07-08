import React, { useContext } from 'react'
import { ButtonWithIcon } from '../../ui/ButtonWithIcon'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { LocalStorageTraining, SeriesWithExercise } from '@/app/types'
import { TimerContext } from '@/app/context/TimerContext'
import { localStorageSetter } from '@/app/lib/utils'
import { v4 } from 'uuid'
import { useTranslations } from 'next-intl'

type ButtonToAddSeriesTypes = {
    localStorageTrainingData: LocalStorageTraining,
    inputs: SeriesWithExercise,
    setProgressedIndexes: (index:number,localStorageTrainingData:LocalStorageTraining) => void,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
    isLoading: boolean
}
export const ButtonToAddSeries = ({localStorageTrainingData,inputs,setProgressedIndexes,setLocalStorageTrainingData,isLoading}:ButtonToAddSeriesTypes) => {
    
        const timerContext = useContext(TimerContext)
    
        const t = useTranslations("Home/Start-Training/[TrainingName]")

        const handleAddSeries = () => {
    
            let localStorageTrainingDataCopy = {...localStorageTrainingData}
    
            if(!localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].date){
                localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].date = new Date()
            }
    
            localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets = [
                ...localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets,
                {
                    difficulty: inputs.difficulty,
                    repeat: inputs.repeat,
                    side: inputs.side,
                    weight: inputs.weight,
                    time:  inputs.time,
                    id: v4()
                }
            ]
    
            localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)
    
            setProgressedIndexes(localStorageTrainingDataCopy.currentExerciseIndex,localStorageTrainingDataCopy)
            setLocalStorageTrainingData(localStorageTrainingDataCopy)
            timerContext?.setCurrentSecond(0)
            
        }
  return (
    <ButtonWithIcon 
        onClick={()=>handleAddSeries()} 
        className={` text-xl rounded-md py-4 flex items-center justify-between px-5 `} 
        isPrimary 
        disabled={isLoading}
        buttonText={t("AddSeries")}
        childrenIcon={
            <Icon className='bg-opacity-0 flex'>
                <PlusIcon /> 
            </Icon>
            }
        />
  )
}
