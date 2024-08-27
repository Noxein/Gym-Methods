import { checkTrainingInProgress, GetUserTrainingByName } from "@/app/actions"
import { TrainingInProcess } from "@/app/components/home/start-training/TrainingInProcess"
import { Training } from "@/app/components/home/start-training/Training"
import { TrainingError } from "@/app/components/home/start-training/TrainingError"
import { ContinueTraining } from "@/app/components/home/start-training/ContinueTraining"

type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
}
export default async function page({params,searchParams}:Pagetypes){
    //console.log(params,searchParams)
    const decodedName = decodeURI(params.trainingName)
    console.log(decodedName)
    const isAnyTrainingInProgress = await checkTrainingInProgress()
    const training = await GetUserTrainingByName(decodedName)
    
    if(searchParams.inProgress && isAnyTrainingInProgress){
        return <ContinueTraining name={decodedName} training={training.training} />
    }
    if(isAnyTrainingInProgress) return (
        <TrainingInProcess trainingName={params.trainingName}/>
    )
    if(training.error){
        return <TrainingError message={training.error}/>
    }
    return(
        <Training name={decodedName} training={training.training} lastid={0} trainingid=""/>
    )
}