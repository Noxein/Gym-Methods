import React from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'

type TrainingErrorTypes = {
    message: string,
}
export const TrainingError = ({message}:TrainingErrorTypes) => {
  return (
    <BlurBackgroundModal>
        <div className='text-white'>{message}</div>
    </BlurBackgroundModal>
  )
}
