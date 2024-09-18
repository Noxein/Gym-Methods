import React from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'

type TrainingErrorTypes = {
    message: string,
    children?: React.ReactNode
}
export const TrainingError = ({message,children}:TrainingErrorTypes) => {
  return (
    <BlurBackgroundModal>
        <div className='text-white text-2xl text-center'>{message}</div>
        <div className='flex justify-center mx-5 text-2xl'>{children}</div>
    </BlurBackgroundModal>
  )
}
