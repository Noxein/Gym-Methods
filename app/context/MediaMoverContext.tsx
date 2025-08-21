'use client'
import { BigTrainingStarter, ProgressedIndexesType } from "@/app/types";
import { createContext, useEffect, useState } from "react";

export const MediaMoverContext = createContext<MediaMoverContextTypes|null>(null)

type MediaMoverContextTypes = {
    start: number,
    current: number,
    totalwidth: number,
    touchEnd: (e: React.TouchEvent<HTMLDivElement>) => "none" | "right" | "left",
    touchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
}

type ModalContextsProviderTypes = {
    children: React.ReactNode,
}

export const MediaMoverContextProvider = ({children}:ModalContextsProviderTypes) => {
    const[start,setStart] = useState(0)
    const[current,setCurrent] = useState(0)
    const[totalwidth,setTotalWidth] = useState(0)

    useEffect(()=>{
        const elem = document.querySelector('.elementWidth')
        if(elem){
            console.log(elem)
            setTotalWidth(elem?.clientWidth)
        }
    },[])

    const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setCurrent(e.changedTouches[0].clientX)
        if(!start) setStart(e.changedTouches[0].clientX)
    }
    
    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const end = e.changedTouches[0].clientX

        if(Math.abs(start-end) < totalwidth/2 || start === 0){
            console.log('RETURNED PREMATURLY')
            setStart(0)
            setCurrent(0)
            return 'none'
        } 
        if(start < end){
            // swipe to right
            //currentExerciseIndex > 0 && setCurrentExerciseIndex(currentExerciseIndex-1)
            setStart(0)
            setCurrent(0)
            return 'right'
        }else{
            //swipe to left
            setStart(0)
            setCurrent(0)
            return 'left'
            //currentExerciseIndex < planData.subplans[planData.currentplanindex].exercises.length - 1 && setCurrentExerciseIndex(currentExerciseIndex+1)
        }


    }

    
    return(
        <MediaMoverContext.Provider value={{
            start,
            current,
            totalwidth,
            touchEnd,
            touchMove
            }}>
                {children}
        </MediaMoverContext.Provider>
    )
}