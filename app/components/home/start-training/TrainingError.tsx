import { BlurBackgroundModal } from '../../BlurBackgroundModal'

type TrainingErrorTypes = {
    message: string,
    children?: React.ReactNode
}
export const TrainingError = ({message,children}:TrainingErrorTypes) => {
  return (
    <BlurBackgroundModal>
      <div className='flex flex-col gap-4'>
          <div className='text-white text-2xl text-center'>{message}</div>
          <div className='flex justify-center text-2xl w-full'>{children}</div>
      </div>
    </BlurBackgroundModal>
  )
}
