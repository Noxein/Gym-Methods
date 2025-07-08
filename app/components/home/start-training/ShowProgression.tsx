import { Progression, SeriesWithExercise, UserTrainingPlan } from '@/app/types'
import React, { useContext } from 'react'
import { ModalContexts } from './ModalContexts'

type ShowProgressionType = {
    trainingPlan: UserTrainingPlan,
    currentExercise: string,
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
    goal?: Progression
}
export const ShowProgression = ({trainingPlan,currentExercise,inputs,setInputs,goal}:ShowProgressionType) => {
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
        <p>Progresja</p>

        {goal && 
        <div className='flex flex-col gap-2'> 
        {goal?.series.map((seria ,index)=>(
            <div className='flex bg-darkLight py-2 rounded-xl' onClick={()=>handleEditInputs(seria)} key={index}>
                <div className='flex-1'>{seria.weightGoal} KG</div>
                <div className='flex-1'>{seria.repetitions} {seria.repetitions>4?'Serii':seria.repetitions>1?"Serie":seria.repetitions===0?"Serii":"Seria"}</div>
            </div>
        ))}
        </div>
        }
    </div>
  )
}
