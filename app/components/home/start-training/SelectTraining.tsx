import { TrainingList } from './TrainingList'
import { LastTrainings } from './LastTrainings'
import { Suspense } from 'react'
import { TrainingListSkeleton } from '../../Loading/home/start-training/TrainingListSkeleton'
import { LatestTrainingSkeleton } from '../../Loading/home/start-training/LatestTrainingSkeleton'
import { H1 } from './H1'
import { H2 } from './H2'
import { AddTrainingLink } from './AddTrainingLink'

export const SelectTraining = async () => {

  return (
    <div className='flex flex-col min-h-[calc(100dvh-40px)]'>
      <H1 />
      <AddTrainingLink />

      <Suspense fallback={<TrainingListSkeleton />}>
        <TrainingList/>
      </Suspense>

      <div className='mt-auto mb-20'>
        <H2 />

      <Suspense fallback={<LatestTrainingSkeleton />}>
        <LastTrainings />
      </Suspense>
        
      </div>
    </div>
  )
}
