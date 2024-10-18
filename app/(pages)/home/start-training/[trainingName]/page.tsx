import { checkTrainingInProgress, GetUserTrainingByName } from "@/app/actions"
import { TrainingInProcess } from "@/app/components/home/start-training/TrainingInProcess"
import { Training } from "@/app/components/home/start-training/Training"
import { TrainingError } from "@/app/components/home/start-training/TrainingError"
import { ContinueTraining } from "@/app/components/home/start-training/ContinueTraining"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Trening",
};


type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
}
export default async function page({params,searchParams}:Pagetypes){
    const decodedName = decodeURI(params.trainingName)
    const isAnyTrainingInProgress = await checkTrainingInProgress()
    const training = await GetUserTrainingByName(decodedName)
    console.log(training)
    
    if(searchParams.inProgress && isAnyTrainingInProgress){
        return <ContinueTraining name={decodedName} training={training.training} />
    }
    if(isAnyTrainingInProgress) return (
        <TrainingInProcess trainingName={params.trainingName}/>
    )
    if(training.error){
        return <TrainingError message={training.error}/>
    }
    if(Object.keys(training.training?.exercises!).length===0){
        return <TrainingError message={'Ten trening nie ma żadnych ćwiczeń!'}>
            <Link href={`/home/profile/my-training-plans/${decodedName}`} className="text-white text-center bg-green w-full mt-5 rounded-lg py-2">Dodaj je teraz</Link>
            </TrainingError>
    }
    return(
        <Training name={decodedName} training={training.training} lastid={0} trainingid=""/>
    )
}