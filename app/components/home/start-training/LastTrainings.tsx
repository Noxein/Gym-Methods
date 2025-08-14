import { LastTrainingItem } from './LastTrainingItem'
import { BigTrainingStarter, SubPlanStarter } from '@/app/types'

type LatestTrainingsTypes = {
  trainingList: BigTrainingStarter[] | undefined
}
export const LastTrainings = async ({trainingList}:LatestTrainingsTypes) => {

    const func = () => {
      let trainings:SubPlanStarter[] = []

      trainingList?.forEach(training=>{
        training.subplans.forEach(subplan=>{
          if(subplan.iscompleted && subplan.date !== null) trainings.push(subplan)
        })
      })

      return trainings
    }

    const trainings = func()
    
  return (
    <div className='flex flex-col gap-2 mx-5'>

        {trainings && trainings.map((training,index)=>(
            index <= 1 && <LastTrainingItem lastExercise={training} key={index}/>
        ))}
        
    </div>
  )
}
