'use client'
import { closeTraining } from '@/app/actions'
import { BlurBackgroundModal } from '@/app/components/BlurBackgroundModal'
import Link from 'next/link'
import React, { useState } from 'react'

type TrainingInProgressModalTypes = {
    trainingName: string,
}
export const TrainingInProgressModal = ({trainingName}:TrainingInProgressModalTypes) => {

    const[isLoading,setIsLoading] = useState(false)
    const[error,setError] = useState('')
    const handleCloseTraining = async () => {
        setIsLoading(true)
        const isError = await closeTraining(`/home/profile/my-training-plans/${trainingName}`)
        if(isError && isError.error) return setError(isError.error)
        setIsLoading(false)
    }

  return (
    <BlurBackgroundModal>
    <div>
      <span>
        Ostatni trening o tej nazwie jest wciąż otwarty <br/>
        aby edytować ten trening musisz zakończyć otwarty trening
      </span>
      <div>
        <button onClick={handleCloseTraining}>Zamknij trening</button>
        <Link href={'/home/profile/my-training-plans'}>Powrót</Link>
      </div>
    </div>
  </BlurBackgroundModal>
  )
}
