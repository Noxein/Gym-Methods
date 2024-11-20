'use client'
import { useState } from 'react'
import { dataType, SetupOneOfThree } from './SetupOneOfThree'
import { StepTwoOutOfThree } from './StepTwoOutOfThree'
import { StepThreeOutOfThree } from './StepThreeOutOfThree'
import { FinalStep } from './FinalStep'
import { ChoseLanguage } from './ChoseLanguage'

export const FirstSetup = () => {
    const[currentStep,setCurrentStep] = useState(0)
    const[data,setData] = useState<dataType>({goal:'Siła',advancmentlevel:'Początkujący',daysexercising:'2'})
    const[exercisesToDelete,setExercisesToDelete] = useState<string[]>([])
    const[favouriteExercises,setFavouriteExercises] = useState<string[]>([])

  return (
    currentStep===0?<ChoseLanguage setCurrentStep={setCurrentStep}/>:
    currentStep===1?<SetupOneOfThree setCurrentStep={setCurrentStep} data={data} setData={setData}/>:
    currentStep===2?<StepTwoOutOfThree setCurrentStep={setCurrentStep} exercisesToDelete={exercisesToDelete} setExercisesToDelete={setExercisesToDelete} favouriteExercises={favouriteExercises} data={data}/>:
    currentStep===3?<StepThreeOutOfThree setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setExercisesToDelete={setExercisesToDelete} exercisesToDelete={exercisesToDelete} data={data}/>:
    currentStep===4?<FinalStep data={data} notfavouriteExercises={exercisesToDelete} exercisesToDelete={exercisesToDelete} favouriteExercises={favouriteExercises} setCurrentStep={setCurrentStep} setFavouriteExercises={setFavouriteExercises}/>:null
  )
}
