import { fetchIncomingTrainings, getStartedTrainingsList } from '@/app/actions'
import { Training } from './Training'
import { getDay } from 'date-fns'
import { ClosestTrainings } from './ClosestTrainings'
import { NewTrainingBtn } from './NewTrainingBtn'
import LongTermTrainingBtn from './start-training/LongTermTrainingBtn'
import { BigTrainingStarter } from '@/app/types'
import Link from 'next/link'

type IncomingTrainingsTypes = {
  trainingList: BigTrainingStarter[] | undefined
}
export const IncomingTrainings = async ({trainingList}:IncomingTrainingsTypes) => {

  return (
    <div className='flex flex-col px-5 gap-4 mt-8'>
      <ClosestTrainings />

      {trainingList && trainingList.map((training,index)=>(
        index <= 1 && 
        <Link href={`/home/start-training/${training.id}`} key={training.id}>
          <LongTermTrainingBtn training={training}/>
        </Link>
      ))}

      <NewTrainingBtn />
    </div>
  )
}


