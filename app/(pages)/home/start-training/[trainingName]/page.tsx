import { getAllUserProgressions, getTrainingDataByName } from '@/app/actions'
import { BackLink } from '@/app/components/home/start-training/BackLink'
import { Training } from '@/app/components/home/start-training/Training'
import { TrainingError } from '@/app/components/home/start-training/TrainingError'
import { Button } from '@/app/components/ui/Button'

type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
} 

export default async function page({params,searchParams}:Pagetypes){
    const decodedTrainingName = decodeURI(params.trainingName)
    const trainingData = await getTrainingDataByName(decodedTrainingName)
    const progressions = await getAllUserProgressions()

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
        trainingData.data && <Training trainingPlanData={trainingData.data} progressions={progressions}/>
  )
}
