import Link from 'next/link'
import LongTermTrainingBtn from './LongTermTrainingBtn'
import { BigTrainingStarter } from '@/app/types'

type TrainingListTypes = {
  trainingList: BigTrainingStarter[] | undefined
}
export const TrainingList = async ({trainingList}:TrainingListTypes) => {

  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>

        {trainingList && trainingList.map(x=>(
            <Link href={`/home/start-training/${x.id}`} key={x.id}>
              <LongTermTrainingBtn training={x}/>
            </Link>
        ))}

    </div>
  )
}
