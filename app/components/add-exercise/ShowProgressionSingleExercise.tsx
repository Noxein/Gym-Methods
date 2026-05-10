import { ExerciseDataContext } from '@/app/context/ExerciseDataContext'
import { ActionTypes, AddExerciceReducerType, Progression, SeriesWithExercise, UserTrainingPlan } from '@/app/types'
import React, { useContext } from 'react'
import { useTranslations } from 'next-intl';

type ShowProgressionSingleExerciseType = {
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
}
export const ShowProgressionSingleExercise = ({state,dispatch}:ShowProgressionSingleExerciseType) => {
    const t = useTranslations("Utils")
    const { exerciseData, progressions } = useContext(ExerciseDataContext)!

    const data = progressions[exerciseData.name]

    const handleEditInputs = (seria:{repetitions: number,
        increase: number,
        weightGoal: number}) => {

        dispatch({type:"WEIGHT",payload:seria.weightGoal})
        dispatch({type:"REPEAT",payload:seria.repetitions})
    }
        
  return (
    <div className='text-white text-center mt-6'>
        <p>{t("Progression")}</p>

        {data && 
        <div className='flex flex-col gap-2'> 
            {data.series.map((seria,index)=>(
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
