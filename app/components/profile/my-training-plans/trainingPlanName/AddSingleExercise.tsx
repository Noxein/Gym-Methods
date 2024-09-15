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
    isTrainingInProgressPage?: boolean,
    setCurrentExercise?: React.Dispatch<React.SetStateAction<TrainingExerciseType>>,
    setTotalNumberOfTrainigs?: React.Dispatch<React.SetStateAction<number>>,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
}
export const AddExercise = ({text,mLeft,isFirst,id,setPlanExercises,isTrainingInProgressPage=false,setCurrentExercise,setTotalNumberOfTrainigs,setShowExerciseList,setShowAddExercise}:AddExerciseType) => {
    const theme = useContext(ThemeContext)

    const addExercise = () => {
        if(isTrainingInProgressPage){
            setTotalNumberOfTrainigs && setTotalNumberOfTrainigs(prev=>{
                console.log(prev)
                return prev+1
            })
            setCurrentExercise && setCurrentExercise({exerciseid:id,exercisename:text,id:uuidv4()})
            setPlanExercises(x=>{
                if(x) return [{exerciseid:id,exercisename:text,id:uuidv4()},...x]
                return [{exerciseid:id,exercisename:text,id:uuidv4()}]
            })
            setShowExerciseList && setShowExerciseList(false)
            setShowAddExercise && setShowAddExercise(false)
            return
        }
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