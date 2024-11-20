import { fetchIncomingTrainings } from '@/app/actions'
import { Training } from './Training'
import { getDay } from 'date-fns'
import { ClosestTrainings } from './ClosestTrainings'
import { NewTrainingBtn } from './NewTrainingBtn'

export const IncomingTrainings = async () => {
    const trainings = await fetchIncomingTrainings()

  return (
    <div className='flex flex-col px-5 gap-4 mt-8'>
      <ClosestTrainings />

      {trainings.map(training=>(
        <Training training={training} key={training.id}/>
      ))}

      <NewTrainingBtn />
    </div>
  )
}


