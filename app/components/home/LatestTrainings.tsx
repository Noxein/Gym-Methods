import { getTwoLatestTrainings } from '@/app/actions'
import { CompletedTraining } from './CompletedTraining'
import { LatestTrainingsHeader } from './LatestTrainingsHeader';

export const LatestTrainings = async () => {
    const trainings = await getTwoLatestTrainings()

  return (
    <div className='mx-5'>
    <LatestTrainingsHeader />
      <div className='flex flex-wrap gap-4 mt-3'>
        {trainings.newArr?.map((training,index)=>(
          <CompletedTraining training={training} trainingDate={trainings.trainingNames[index].datetime} trainingName={trainings.trainingNames[index].trainingname} key={index}/>
        ))}
      </div>
    </div>
  )
}
