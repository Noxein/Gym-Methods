'use client'
import { closeTraining, getTrainingInProgressData } from '@/app/actions'
import React, { useState } from 'react'
import Link from 'next/link'

type TrainingInProcessTypes = {
  trainingName:string
}
export const TrainingInProcess = async ({trainingName}:TrainingInProcessTypes) => {
  const[error,setError] = useState('')
  const[isLoading,setIsLoading] = useState(false)

  const handleCloseTraining = async () => {
      setIsLoading(true)
      const isError = await closeTraining(`/home/start-training/${trainingName}`)
      if(isError && isError.error) return setError(isError.error)
      setIsLoading(false)
  }
return (
  <div className='h-screen w-screen pb-20 flex justify-center items-center flex-col text-white gap-6 text-2xl'>
    <div className='font-extralight text-center'>
        Twój ostatni trening <br/>
        <b className='font-bold'>{trainingName}</b> <br/>
        nie został zakończony.
    </div>
    <div className='font-extralight flex gap-2 w-full px-8'>
      <button className='rounded-lg bg-green flex-1 py-3 disabled:bg-gray-400' disabled={isLoading}>
        <Link href={`/home/start-training/${trainingName}?inProgress=true`}>
          Wznów trening
        </Link>
      </button>
      <button className='rounded-lg bg-red flex-1 disabled:bg-gray-400' onClick={handleCloseTraining} disabled={isLoading}>Zakończ trening</button>
    </div>
  </div>
)
}
