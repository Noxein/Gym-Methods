import { TrainingList } from './TrainingList'
import { LastTrainings } from './LastTrainings'
import { Suspense } from 'react'
import { TrainingListSkeleton } from '../../Loading/home/start-training/TrainingListSkeleton'
import { LatestTrainingSkeleton } from '../../Loading/home/start-training/LatestTrainingSkeleton'
import { H1 } from './H1'
import { H2 } from './H2'
import { AddTrainingLink } from './AddTrainingLink'
import { getAllUserLongTermPlans, getStartedTrainingsList } from '@/app/actions'

export const SelectTraining = async () => {

  const LongTermTrainingList = await getAllUserLongTermPlans()
  const trainingList = await getStartedTrainingsList()

  return (
    <div className='flex flex-col min-h-[calc(100dvh-40px)]'>
      <H1 />
      <AddTrainingLink  LongTermTrainingList={LongTermTrainingList}/>

      <Suspense fallback={<TrainingListSkeleton />}>
        <TrainingList trainingList={trainingList}/>
      </Suspense>

      <div className='mt-auto mb-20'>
        <H2 />

        <Suspense fallback={<LatestTrainingSkeleton />}>
          <LastTrainings trainingList={trainingList}/>
        </Suspense>
        
      </div>
    </div>
  )
}
