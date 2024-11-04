import { LoadingTrainingPlanSkeleton } from '@/app/components/Loading/my-training-plans/LoadingTrainingPlanSkeleton'
import { LinkWithIcon } from '@/app/components/ui/LinkWithIcon'
import { Suspense } from 'react'

type SpecificTrainingDontExistTypes = {
    trainingName:string
}
export const SpecificTrainingDontExist = ({trainingName}:SpecificTrainingDontExistTypes) => {
  return (
    <Suspense fallback={<LoadingTrainingPlanSkeleton />}>
        <div className='text-2xl text-white flex -mt-20 flex-col justify-center h-screen mx-5 gap-4'>
        <h1 className='text-center'>Nie znaleziono treningu o nazwie <br/> <strong>{trainingName}</strong></h1>
            <LinkWithIcon href={'/home/profile/my-training-plans'} linkText='Powrót do Treningów'
                className='border-green border-1 text-green'
                centerText
            ></LinkWithIcon>
        </div>
    </Suspense>
  )
}
