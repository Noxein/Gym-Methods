import { getAllUserProgressions, getTrainingDataById } from '@/app/actions'
import { BackLink } from '@/app/components/home/start-training/BackLink'
import { Training } from '@/app/components/home/start-training/Training'
import { TrainingError } from '@/app/components/home/start-training/TrainingError'
import { Button } from '@/app/components/ui/Button'

type Pagetypes = {
    params: Promise<{trainingName:string}>
    searchParams: Promise<{ inProgress: string }>
} 

export default async function page(props:Pagetypes) {
  const params = await props.params;
  const decodedTrainingId = decodeURI(params.trainingName)
  const trainingData = await getTrainingDataById(decodedTrainingId)

  if(trainingData.error){
    return (
    <TrainingError message={trainingData.error}>
      <Button className='px-4 flex-1'>
        <BackLink />
      </Button>
    </TrainingError>
    )
  }
  return (
        trainingData.data && <Training trainingPlanData={trainingData.data} />
  )
}
