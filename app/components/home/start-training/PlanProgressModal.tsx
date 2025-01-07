import { UserTrainingPlan } from '@/app/types'
import React, { useContext } from 'react'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'

type PlanProgressModalType = {
    currentExercise: string,
    trainingPlan: UserTrainingPlan,
}
export const PlanProgressModal = ({currentExercise,trainingPlan}:PlanProgressModalType) => {
    const data = trainingPlan.exercises.find(x=>x.exercisename === currentExercise)
    const modalsContext = useContext(ModalContexts)

    const handleCloseModal = () => {
        modalsContext?.setShowPlanProgressionModal(false)
    }
  return (
     <BlurBackgroundModal>
        <div className='text-white'>
            <p>{currentExercise}</p>
            <div className='flex'>
                <p className='flex-1'>Ciężar</p>
                <p className='flex-1'>Powtórzenia</p>
                <p className='flex-1'>Przyrost</p>
            </div>
            <div>
                {data && data.series?.map(seria=>(
                    <div className='flex '>
                        <p className='flex-1'>{seria.increase}</p>
                        <p className='flex-1'>{seria.repetitions}</p>
                        <p className='flex-1'>{seria.weightGoal}</p>
                    </div>
                ))}
            </div>
            <Button onClick={handleCloseModal}>
                Zamknij
            </Button>
        </div>
    </BlurBackgroundModal>
  )
}
