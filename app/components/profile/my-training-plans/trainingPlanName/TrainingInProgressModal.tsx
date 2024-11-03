'use client'
import { closeTraining } from '@/app/actions'
import { BlurBackgroundModal } from '@/app/components/BlurBackgroundModal'
import { Button } from '@/app/components/ui/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import { LinkBtn } from '../../LinkBtn'
import { LinkWithIcon } from '@/app/components/ui/LinkWithIcon'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'

type TrainingInProgressModalTypes = {
    trainingName: string,
}
export const TrainingInProgressModal = ({trainingName}:TrainingInProgressModalTypes) => {

    const[loading,setLoading] = useState(false)
    const[error,setError] = useState('')
    const handleCloseTraining = async () => {
      setLoading(true)
        const isError = await closeTraining(`/home/profile/my-training-plans/${trainingName}`)
        if(isError && isError.error){
          setLoading(false)
          return setError(isError.error)
        } 
        setLoading(false)
    }

  return (
    <BlurBackgroundModal>
    <div className='w-full mx-5 text-white flex flex-col gap-4'>
      <p className='text-center text-xl'>
        Ostatni trening o tej nazwie jest wciąż otwarty <br/>
        aby edytować ten trening musisz <br/> <strong>zakończyć rozpoczęty trening</strong> 
      </p>
      <div className='flex gap-4'>
        <Button isPrimary className='flex-1' onClick={handleCloseTraining} disabled={loading}>
          Zamknij trening
        </Button>
        <ErrorDiv error={error}/>
        <LinkWithIcon href={'/home/profile/my-training-plans'} linkText='Powrót' className='flex-1 border-green border-1' centerText disabled={loading}></LinkWithIcon>
      </div>
    </div>
  </BlurBackgroundModal>
  )
}
