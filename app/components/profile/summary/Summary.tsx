import React from 'react'
import { PieChart } from './PieChart'
import { getSummaryPageData, getTraineeSummaryPageData } from '@/app/actions'
import { Charts } from './Charts'
import { SummaryContextProvider } from '@/app/context/SummaryContext'
import NotEnoughData from './NotEnoughData'

type SummaryProps = {
    traineeId?: string
}

export const Summary = async ({ traineeId }: SummaryProps) => {

    const pageData = traineeId ? await getTraineeSummaryPageData(traineeId) : await getSummaryPageData()

    if(!pageData || !pageData.summaryData || pageData.basicSummaryData.error){
        return (
            <NotEnoughData />
        )
    }
  return (
    <div className='mx-5 flex flex-col mb-24'>
      <SummaryContextProvider
        initialData={pageData.basicSummaryData.data}
        timeExercises={pageData.timeOrHandleExercises.ExercisesThatRequireTimeMesure.flatMap((exercise) => [exercise.id, exercise.exercisename])}
      >
        <PieChart data={pageData.summaryData.piechart} showAddExerciseLink={!traineeId} allExercisesObject={pageData.allExercisesObject}/>
        <Charts allExercisesInOneArray={pageData.allExercisesInOneArray} timeOrHandleExercises={pageData.timeOrHandleExercises} allExercisesObject={pageData.allExercisesObject}/>
      </SummaryContextProvider>
    </div>
  )
}
