import { ExerciseDataContext } from '@/app/context/ExerciseDataContext'
import { ActionTypes, AddExerciceReducerType, Progression, SeriesWithExercise, UserTrainingPlan } from '@/app/types'
import React, { useContext } from 'react'

type ShowProgressionSingleExerciseType = {
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
}
export const ShowProgressionSingleExercise = ({state,dispatch}:ShowProgressionSingleExerciseType) => {
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
        <p>Progresja</p>

        {data && 
        <div className='flex flex-col gap-2'> 
            {data.series.map((seria,index)=>(
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
