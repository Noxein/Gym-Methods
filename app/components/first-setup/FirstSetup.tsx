'use client'
import { useState } from 'react'
import { dataType, Goal } from './Goal'
import { TrainingCreator } from './TrainingCreator'
import { ExercisesSelector } from './ExercisesSelector'
import { ChoseLanguage } from './ChoseLanguage'
import { FirstSetupSelectedSteps } from '@/app/types'
import Purpose from './Purpose'

export const FirstSetup = () => {
    const[currentStep,setCurrentStep] = useState<FirstSetupSelectedSteps>('language')
    const[data,setData] = useState<dataType>({goal:'Siła',advancmentlevel:'Początkujący',daysexercising:'2'})
    const[exercisesToDelete,setExercisesToDelete] = useState<string[]>([])
    const[favouriteExercises,setFavouriteExercises] = useState<string[]>([])

  return (
    currentStep==='language'?<ChoseLanguage setCurrentStep={setCurrentStep}/>:
    currentStep==='purpose'?<Purpose setCurrentStep={setCurrentStep}/>:
    currentStep==='goal'?<Goal setCurrentStep={setCurrentStep} data={data} setData={setData}/>:
    currentStep==='training-creator'?<TrainingCreator setCurrentStep={setCurrentStep} exercisesToDelete={exercisesToDelete} setExercisesToDelete={setExercisesToDelete} favouriteExercises={favouriteExercises} data={data}/>:
    currentStep==='fav-exercises'?<ExercisesSelector setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setExercisesToDelete={setFavouriteExercises} exercisesToDelete={exercisesToDelete} data={data}/>:
    currentStep==='not-fav-exercises'?<ExercisesSelector setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setExercisesToDelete={setExercisesToDelete} exercisesToDelete={exercisesToDelete} data={data}/>:<></>
    )
}
