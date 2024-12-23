import { getExistingTraining } from '@/app/actions'
import { UserTrainingPlan } from '@/app/types'
import { Training } from './Training'

type ContinueTrainingTypes = {
    name: string,
    training?: UserTrainingPlan,
}

export const ContinueTraining = async ({name,training}:ContinueTrainingTypes) => {
    const loadPlan = await getExistingTraining()
    const trainingLeft = training?.exercises.filter(x=>loadPlan?.exercisesleft[0].includes(x.id))
    console.log(training?.exercises,loadPlan?.exercisesleft,trainingLeft)

  return (
    <Training />
  )
}
