import { LoadingTrainingPlanSkeleton } from '@/app/components/Loading/my-training-plans/LoadingTrainingPlanSkeleton'
import Link from 'next/link'
import React, { Suspense } from 'react'

type SpecificTrainingDontExistTypes = {
    trainingName:string
}
export const SpecificTrainingDontExist = ({trainingName}:SpecificTrainingDontExistTypes) => {
  return (
    <Suspense fallback={<LoadingTrainingPlanSkeleton />}>
        <div className='text-2xl text-white flex -mt-20 flex-col justify-center h-screen'>
            <h1 className='text-center'>Nie znaleziono treningu o nazwie <br/> <strong>{trainingName}</strong></h1>
            <Link href={`/home/profile/my-training-plans`} className='text-center text-blue-300 hover:text-blue-500 border-2 border-white py-2 rounded-md mx-20 mt-5'>Powrót do Treningów</Link>
        </div>
    </Suspense>
  )
}
