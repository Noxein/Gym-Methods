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
    const[currentExerciseIndex,setCurrentExerciseIndex] = useState(0)

    useEffect(()=>{


        const currentPlanLocalData = localStorage.getItem('currenPlanLocalData')
        if(currentPlanLocalData){
            const parsedData = JSON.parse(currentPlanLocalData) as SubPlanStarter

            let planClone = structuredClone(planData)
            planClone.subplans[planClone.currentplanindex] = parsedData
            setPlanData(planClone)
        }
    },[])
    
    const setCurrentLocalData = (currentPlan: SubPlanStarter) => {
        localStorage.setItem('currenPlanLocalData',JSON.stringify(currentPlan))
    }

    const deleteCurrentLocalData = () => {
        localStorage.removeItem('currenPlanLocalData')
    }
    
    return(
        <LongPlanContext.Provider value={{
            planData,
            setPlanData,
            currentExerciseIndex,
            setCurrentExerciseIndex,
            start,
            current,
            setCurrentLocalData,
            deleteCurrentLocalData
            }}>
                {children}
        </LongPlanContext.Provider>
    )
}