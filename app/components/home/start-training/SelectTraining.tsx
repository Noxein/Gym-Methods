import { TrainingList } from './TrainingList'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { LastTrainings } from './LastTrainings'
import Link from 'next/link'
import { Suspense } from 'react'
import { TrainingListSkeleton } from '../../Loading/home/start-training/TrainingListSkeleton'
import { LatestTrainingSkeleton } from '../../Loading/home/start-training/LatestTrainingSkeleton'
import { LinkWithIcon } from '../../ui/LinkWithIcon'

export const SelectTraining = async () => {
    
    
  return (
    <div className='flex flex-col min-h-[calc(100dvh-40px)]'>
        <h1 className='text-2xl text-center mt-10'>ROZPOCZNIJ TRENING</h1>
        <LinkWithIcon
          childrenIcon={
            <Icon className='bg-opacity-0'>
            <PlusIcon />
          </Icon>
          }
          href={'/home/profile/my-training-plans?showAddModal=true'}
          linkText='Dodaj nowy trening'
          className='bg-green mx-5 py-4 text-xl mt-4'
        />

        <Suspense fallback={<TrainingListSkeleton />}>
          <TrainingList/>
        </Suspense>

        <div className='mt-auto mb-20'>
          <h2 className='text-center text-xl'>OSTATNIE TRENINGI</h2>

        <Suspense fallback={<LatestTrainingSkeleton />}>
          <LastTrainings />
        </Suspense>
          
        </div>
    </div>
  )
}
