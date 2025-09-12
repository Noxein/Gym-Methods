'use client'
import { BigTrainingStarter, ProgressedIndexesType, SubPlanStarter } from "@/app/types";
import { createContext, useEffect, useState } from "react";

export const LongPlanContext = createContext<LongPlanContextTypes|null>(null)

type LongPlanContextTypes = {
    planData: BigTrainingStarter,
    setPlanData: React.Dispatch<React.SetStateAction<BigTrainingStarter>>,
    currentExerciseIndex: number,
    setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>,
    start: number,
    current: number,
    totalwidth: number,
    touchEnd: (e: React.TouchEvent<HTMLDivElement>) => void,
    touchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
    setCurrentLocalData: (currentPlan: SubPlanStarter) => void,
    deleteCurrentLocalData: () => void
}

type ModalContextsProviderTypes = {
    children: React.ReactNode,
    trainingPlanData: BigTrainingStarter
}

export const LongPlanContextProvider = ({children,trainingPlanData}:ModalContextsProviderTypes) => {
    const[planData, setPlanData] = useState(trainingPlanData)
    const[start,setStart] = useState(0)
    const[current,setCurrent] = useState(0)
    const[totalwidth,setTotalWidth] = useState(0)
    const[currentExerciseIndex,setCurrentExerciseIndex] = useState(0)

    useEffect(()=>{
        const elem = document.querySelector('.elementWidth')
        if(elem){
            setTotalWidth(elem?.clientWidth)
        }

        const currentPlanLocalData = localStorage.getItem('currenPlanLocalData')
        if(currentPlanLocalData){
            const parsedData = JSON.parse(currentPlanLocalData) as SubPlanStarter

            let planClone = structuredClone(planData)
            planClone.subplans[planClone.currentplanindex] = parsedData
            setPlanData(planClone)
        }
    },[])

    const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setCurrent(e.changedTouches[0].clientX)
        if(!start) setStart(e.changedTouches[0].clientX)
    }
    
    const setCurrentLocalData = (currentPlan: SubPlanStarter) => {
        localStorage.setItem('currenPlanLocalData',JSON.stringify(currentPlan))
    }

    const deleteCurrentLocalData = () => {
        localStorage.removeItem('currenPlanLocalData')
    }

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const end = e.changedTouches[0].clientX

        if(Math.abs(start-end) < totalwidth/2 || start === 0){
            setStart(0)
            setCurrent(0)
            return
        } 
        if(start < end){
            // swipe to right
            currentExerciseIndex > 0 && setCurrentExerciseIndex(currentExerciseIndex-1)
        }else{
            //swipe to left
            currentExerciseIndex < planData.subplans[planData.currentplanindex].exercises.length - 1 && setCurrentExerciseIndex(currentExerciseIndex+1)
        }
        setStart(0)
        setCurrent(0)

    }

    
    return(
        <LongPlanContext.Provider value={{
            planData,
            setPlanData,
            currentExerciseIndex,
            setCurrentExerciseIndex,
            start,
            current,
            totalwidth,
            touchEnd,
            touchMove,
            setCurrentLocalData,
            deleteCurrentLocalData
            }}>
                {children}
        </LongPlanContext.Provider>
    )
}