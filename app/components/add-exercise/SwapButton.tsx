'use client';
import { SwapIcon } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../Icon";
import { ExerciseDataContext } from "@/app/context/ExerciseDataContext";
import { useContext } from "react";
import { ActionTypes, AddExerciceReducerType, HandleType, SingleExerciseLocalMemoryData } from "@/app/types";
import { TimerContext } from "@/app/context/TimerContext";
import { differenceInSeconds } from "date-fns";

type SwapButtonTypes = {
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
}

function SwapExerciseButton({dispatch,state}:SwapButtonTypes) {

    const { setDifferentExerciseData, newExerciseName } = useContext(ExerciseDataContext)!

    const { timePassed, setTimePassed, newDateSetter } = useContext(TimerContext)!

    const getExerciseTime = () => {
        const time = localStorage.getItem(newExerciseName+'date')

        const nowDate = new Date()
        if(!time){
            localStorage.setItem(newExerciseName+'date',JSON.stringify(nowDate))
            return nowDate
        }

        const exerciseDate = new Date(JSON.parse(time))
        if(differenceInSeconds(new Date(),exerciseDate) > 3600) return nowDate
        return exerciseDate
    }

    const swapExercise = async () => {
        const data = localStorage.getItem(newExerciseName+'singleExerciseChanged') 
        const parsedData = data ? JSON.parse(data) as SingleExerciseLocalMemoryData : null
        
        await setDifferentExerciseData()

        if(parsedData){
            dispatch({type:"HANDLE", payload: parsedData.handle ? {id: parsedData.handle.id, handlename: parsedData.handle.handlename} as HandleType : undefined})
            dispatch({type:'WEIGHT',payload:parsedData.weight})
            dispatch({type:'REPEAT',payload:parsedData.repeat})
            dispatch({type:'SIDE',payload:parsedData.side})
            dispatch({type:'DIFFICULTY',payload:parsedData.difficultyLevel})
            dispatch({type:'TIME',payload:parsedData.time})
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData.series})
        }
        
        const exerciseTime = getExerciseTime()
        setTimePassed(differenceInSeconds(new Date(),exerciseTime))
        newDateSetter(exerciseTime, newExerciseName)
    }
    return  <Icon className='absolute right-0 top-0' onClick={swapExercise}>
                <SwapIcon fill='#fff' height='25' width='25'/>
            </Icon>
}

export default SwapExerciseButton;