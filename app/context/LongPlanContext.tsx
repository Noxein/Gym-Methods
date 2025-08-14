'use client'
import { BigTrainingStarter, ProgressedIndexesType } from "@/app/types";
import { createContext, useState } from "react";

export const LongPlanContext = createContext<LongPlanContextTypes|null>(null)

type LongPlanContextTypes = {
    planData: BigTrainingStarter,
    setPlanData: React.Dispatch<React.SetStateAction<BigTrainingStarter>>,
    currentExerciseIndex: number,
    setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>,
}

type ModalContextsProviderTypes = {
    children: React.ReactNode,
    trainingPlanData: BigTrainingStarter
}

export const LongPlanContextProvider = ({children,trainingPlanData}:ModalContextsProviderTypes) => {
    const[planData, setPlanData] = useState(trainingPlanData)
    const[currentExerciseIndex,setCurrentExerciseIndex] = useState(0)
    return(
        <LongPlanContext.Provider value={{
            planData,
            setPlanData,
            currentExerciseIndex,
            setCurrentExerciseIndex
            }}>
                {children}
        </LongPlanContext.Provider>
    )
}