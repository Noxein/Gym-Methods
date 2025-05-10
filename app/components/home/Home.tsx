import { Suspense } from 'react'
import { AddExerciseButton } from './AddExerciseButton'
import { IncomingTrainings } from './IncomingTrainings'
import { LatestTrainings } from './LatestTrainings'
import { IncomingTrainingsSkeleton } from '../Loading/home/IncomingTrainingsSkeleton'
import { LatestTrainingsSkeleton } from '../Loading/home/LatestTrainingsSkeleton'
import { WidgetDataProvider } from './WidgetDataProvider'
import { HomeWidgetSeleton } from '../Loading/home/HomeWidgetSeleton'

type HomeTypes = {
  useremail?: string | null
}

export const Home = ({useremail}:HomeTypes) => {
  return (
    <div className='mb-20'>
      <Suspense fallback={<HomeWidgetSeleton />}>
        <WidgetDataProvider />
      </Suspense>
      
      <Suspense fallback={<IncomingTrainingsSkeleton />}>
        <IncomingTrainings />
      </Suspense>
        
      <Suspense fallback={<LatestTrainingsSkeleton />}>
        <LatestTrainings />
      </Suspense>
        
      <AddExerciseButton />

      {/* <OpenTrainingRemainder useremail={useremail}/> */}
    </div>
  )
}
