import React from 'react'
import { PieChart } from './PieChart'
import { AllExercisesInOneArray, getAllExercises, getSummaryData, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { Charts } from './Charts'
import { SummaryContextProvider } from '@/app/context/SummaryContext'
import NotEnoughData from './NotEnoughData'

export const Summary = async () => {

    const data = await getSummaryData()
    const timeOrHandleExercises = await userExercisesThatRequireHandlesOrTimeMesure()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allExercisesObject = await getAllExercises()
    if(!data){
        return (
            <NotEnoughData />
        )
    }
  return (
    <div className='mx-5 flex flex-col mb-24'>
      <SummaryContextProvider>
        <PieChart data={data.piechart}/>
        <Charts allExercisesInOneArray={allExercisesInOneArray} timeOrHandleExercises={timeOrHandleExercises} allExercisesObject={allExercisesObject}/>
      </SummaryContextProvider>
    </div>
  )
}
