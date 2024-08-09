'use client'
import React, { useState } from 'react'
import { dataType, SetupOneOfThree } from './SetupOneOfThree'
import { StepTwoOutOfThree } from './StepTwoOutOfThree'
import { StepThreeOutOfThree } from './StepThreeOutOfThree'

export const FirstSetup = () => {
    const[currentStep,setCurrentStep] = useState(1)
    const[data,setData] = useState<dataType>({goal:'Siła',advancmentlevel:'Początkujący',daysexercising:'2'})
    const[exercisesToDelete,setExercisesToDelete] = useState<string[]>([])
    const[favouriteExercises,setFavouriteExercises] = useState<string[]>([])

  return (
    currentStep===1?<SetupOneOfThree setCurrentStep={setCurrentStep} data={data} setData={setData}/>:
    currentStep===2?<StepTwoOutOfThree setCurrentStep={setCurrentStep} exercisesToDelete={exercisesToDelete} setExercisesToDelete={setExercisesToDelete} favouriteExercises={favouriteExercises}/>:
    currentStep===3?<StepThreeOutOfThree setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setFavouriteExercises={setFavouriteExercises} exercisesToDelete={exercisesToDelete} data={data}/>:null
  )
}
