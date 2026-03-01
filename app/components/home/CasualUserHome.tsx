import { Suspense } from 'react'
import { IncomingTrainings } from './IncomingTrainings'
import { IncomingTrainingsSkeleton } from '../Loading/home/IncomingTrainingsSkeleton'
import { LatestTrainingsSkeleton } from '../Loading/home/LatestTrainingsSkeleton'
import { WidgetDataProvider } from './WidgetDataProvider'
import { HomeWidgetSeleton } from '../Loading/home/HomeWidgetSeleton'
import { LastTrainings } from './start-training/LastTrainings'
import { getStartedTrainingsList } from '@/app/actions'
import { LatestTrainingsHeader } from './LatestTrainingsHeader'

type HomeTypes = {
  useremail?: string | null
}

export const CasualUserHome = async ({useremail}:HomeTypes) => {
  const trainingList = await getStartedTrainingsList()
  return (
    <div className='mb-20'>
      <Suspense fallback={<HomeWidgetSeleton />}>
        <WidgetDataProvider />
      </Suspense>
      
      <Suspense fallback={<IncomingTrainingsSkeleton />}>
        <IncomingTrainings trainingList={trainingList}/>
      </Suspense>
        
      <Suspense fallback={<LatestTrainingsSkeleton />}>
      <div className='mt-20 text-white'>
        <LatestTrainingsHeader />
        <LastTrainings trainingList={trainingList}/>

      </div>
      </Suspense>
    </div>
  )
}
