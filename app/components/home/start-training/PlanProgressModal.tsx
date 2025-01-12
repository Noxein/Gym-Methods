import { LocalStorageTraining, SeriesWithExercise, UserTrainingPlan } from '@/app/types'
import React, { useContext, useEffect } from 'react'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { Icon } from '../../Icon'
import { CheckIcon } from '@/app/ui/icons/ExpandIcon'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type PlanProgressModalType = {
    currentExercise: string,
    trainingPlan: UserTrainingPlan,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
    localStorageTrainingData: LocalStorageTraining,
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
}
export const PlanProgressModal = ({currentExercise,trainingPlan,setLocalStorageTrainingData,localStorageTrainingData,inputs,setInputs}:PlanProgressModalType) => {
    const data = trainingPlan.exercises.find(x=>x.exercisename === currentExercise)
    const modalsContext = useContext(ModalContexts)
    
    const handleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        modalsContext?.setShowPlanProgressionModal(false)
    }
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
     <div className='fixed left-0 top-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
        <div className='text-white w-full mx-5 mt-5 overflow-y-auto'>
            <p className='mb-12 text-xl text-center'>{currentExercise}</p>
            <div className='flex my-4 mx-2'>
                <p className='flex-1'>Ciężar</p>
                <p className='flex-1'>Powtórzenia</p>
                <p className='flex-1'>Przyrost</p>
            </div>
            <div className='flex flex-col gap-2'>
                {data && data.series?.map((seria,index)=>(
                    <div className={`flex border-1 rounded-lg py-4 px-2 relative bg-darkLight border-green`} key={index} onClick={()=>handleEditInputs(seria)}>
                        <p className='flex-1'>{seria.weightGoal}</p>
                        <p className='flex-1'>{seria.repetitions}</p>
                        <p className='flex-1'>{seria.increase}</p>
                        {modalsContext?.seriesIndexesThatMetGoal.goals.includes(seria.id!) && <div className='absolute right-1'>
                            <Icon>
                                <CheckIcon fill='#fff'/>
                            </Icon>
                        </div>
                        }
                    </div>
                ))}
            </div>
            <Button onClick={handleCloseModal} className='w-full mt-2'>
                Zamknij
            </Button>
        </div>
    </div>
  )
}
