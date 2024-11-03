import { Icon } from '@/app/components/Icon';
import { ThemeContext } from '@/app/context/ThemeContext'
import { localStorageSetter } from '@/app/lib/utils';
import { LocalStorageTraining, TrainingExerciseType } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon';
import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

type AddExerciseType = {
    text:string,
    mLeft:string,
    isFirst:boolean,
    id:string,
    setPlanExercises?: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    isTrainingInProgressPage?: boolean,
    setCurrentExercise?: React.Dispatch<React.SetStateAction<number>>,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
    setLocalStorageTrainingData?: React.Dispatch<React.SetStateAction<LocalStorageTraining>>
}
export const AddExercise = ({text,mLeft,isFirst,id,setPlanExercises,isTrainingInProgressPage=false,setCurrentExercise,setShowExerciseList,setShowAddExercise,setLocalStorageTrainingData}:AddExerciseType) => {
    const theme = useContext(ThemeContext)

    const addExercise = () => {
        if(isTrainingInProgressPage){
            console.log('23')
            setCurrentExercise && setCurrentExercise(x=>x)
            setPlanExercises && setPlanExercises(x=>{
                if(x) return [{exerciseid:id,exercisename:text,id:uuidv4()},...x]
                return [{exerciseid:id,exercisename:text,id:uuidv4()}]
            })
            setLocalStorageTrainingData && setLocalStorageTrainingData(x=>{
                console.log('wedidit')
                let xCopy = {...x}
                xCopy.currentExerciseIndex = xCopy.exercises.length

                xCopy.exercises.push({
                    exerciseId:id,
                    id: String(xCopy.exercises.length),
                    exerciseName: text,
                    sets: [],
                })
                localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
                return xCopy
            })
            setShowExerciseList && setShowExerciseList(false)
            setShowAddExercise && setShowAddExercise(false)
            return
        }
        // const 
        // here add shit
        setPlanExercises && setPlanExercises(x=>{
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