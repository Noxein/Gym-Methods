import { Icon } from '@/app/components/Icon';
import { ThemeContext } from '@/app/context/ThemeContext'
import { TrainingExerciseType } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon';
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
        setPlanExercises(x=>{
            if(x) return [...x,{exerciseid:id,exercisename:text,id:uuidv4()}]
            return [{exerciseid:id,exercisename:text,id:uuidv4()}]
            
        })
    }
    return(
        <button className={`text-left ${mLeft} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} py-[1px] pl-[1px] rounded flex items-center justify-between ${isFirst?'mt-2':null}`} 
        onClick={addExercise}
        >
            <span className={`flex-1 bg-${theme?.colorPallete.primary} rounded-md pl-4 py-3 flex flex-col`}>
                {text}
            </span>
            <Icon className='px-[3px]'>
                <PlusIcon width='20px' fill='#0D1317'/>
            </Icon>
        </button>
    )
}