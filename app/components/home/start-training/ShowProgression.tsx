import { Progression, SeriesWithExercise, UserTrainingPlan } from '@/app/types'
import React, { useContext } from 'react'
import { ModalContexts } from './ModalContexts'
import { useTranslations } from 'next-intl'

type ShowProgressionType = {
    trainingPlan: UserTrainingPlan,
    currentExercise: string,
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
    goal?: Progression
}
export const ShowProgression = ({trainingPlan,currentExercise,inputs,setInputs,goal}:ShowProgressionType) => {
    const t = useTranslations("Utils")
    const modalsContext = useContext(ModalContexts)

    const handleEditInputs = (seria:{repetitions: number,
        increase: number,
        weightGoal: number}) => {
        let inputsCopy :SeriesWithExercise = {...inputs}

        inputsCopy.repeat = seria.repetitions
        inputsCopy.weight = seria.weightGoal

        setInputs(inputsCopy)
        modalsContext?.setShowPlanProgressionModal(false)
    }
        
  return (
    <div className='text-white text-center mt-6'>
        <p>{t("Progression")}</p>

        {goal && 
        <div className='flex flex-col gap-2'> 
        {goal?.series.map((seria ,index)=>(
            <div className='flex bg-darkLight py-2 rounded-xl' onClick={()=>handleEditInputs(seria)} key={index}>
                <div className='flex-1'>{seria.weightGoal} KG</div>
                <div className='flex-1'>{t("RepetitionsCount", {count: seria.repetitions})}</div>
            </div>
        ))}
        </div>
        }
    </div>
  )
}
