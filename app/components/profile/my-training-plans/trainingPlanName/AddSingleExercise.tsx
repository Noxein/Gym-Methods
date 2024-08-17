import { ThemeContext } from '@/app/context/ThemeContext'
import { TrainingExerciseType } from '@/app/types'
import { randomUUID } from 'crypto'
import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

type AddExerciseType = {
    text:string,
    mLeft:string,
    isFirst:boolean,
    id:string,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}
export const AddExercise = ({text,mLeft,isFirst,id,setPlanExercises}:AddExerciseType) => {
    const theme = useContext(ThemeContext)

    const addExercise = () => {
        setPlanExercises(x=>[...x,{exerciseid:id,exercisename:text,id:uuidv4()}])
    }
    return(
        <button className={`text-left ${mLeft} bg-[${theme?.colorPallete.secondary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between ${isFirst?'mt-2':null}`} 
        onClick={addExercise}
        >
            <span className={`flex-1 bg-[${theme?.colorPallete.primary}] rounded-md pl-4 py-2 flex flex-col`}>
                {text}
            </span>
        </button>
    )
}