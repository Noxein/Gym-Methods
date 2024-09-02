import { Suspense } from 'react'
import { AddExerciseButton } from './AddExerciseButton'
import { IncomingTrainings } from './IncomingTrainings'
import { LatestTrainings } from './LatestTrainings'
import { MapDays } from './MapDays'
import { IncomingTrainingsSkeleton } from '../Loading/home/IncomingTrainingsSkeleton'
import { LatestTrainingsSkeleton } from '../Loading/home/LatestTrainingsSkeleton'

export const Home = () => {

  return (
    <div className='mb-20'>

      <MapDays />

      <Suspense fallback={<IncomingTrainingsSkeleton />}>
        <IncomingTrainings />
      </Suspense>
        
      <Suspense fallback={<LatestTrainingsSkeleton />}>
        <LatestTrainings />
      </Suspense>
        
      <AddExerciseButton />
    </div>
  )
}
