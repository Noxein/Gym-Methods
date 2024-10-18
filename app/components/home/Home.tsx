import { Suspense } from 'react'
import { AddExerciseButton } from './AddExerciseButton'
import { IncomingTrainings } from './IncomingTrainings'
import { LatestTrainings } from './LatestTrainings'
import { MapDays } from './MapDays'
import { IncomingTrainingsSkeleton } from '../Loading/home/IncomingTrainingsSkeleton'
import { LatestTrainingsSkeleton } from '../Loading/home/LatestTrainingsSkeleton'
import { SelectedDateInfo } from './SelectedDateInfo'
import { Last30DaysExercises, SelectedDayExercisesForWidget } from '@/app/actions'

export const Home = async () => {
  const data = await Last30DaysExercises()
  return (
    <div className='mb-20'>

      <MapDays Last30DaysExercises={data}/>
      
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
