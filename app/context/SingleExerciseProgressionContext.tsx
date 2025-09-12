'use client'
import { ProgressedIndexesType } from "@/app/types";
import { createContext, useState } from "react";

export const SingleExerciseProgressionContext = createContext<ProgressionContextTypes|null>(null)

type ProgressionContextTypes = {
    seriesIndexesThatMetGoal: ProgressedIndexesType,
    setSeriesIndexesThatMetGoal: React.Dispatch<React.SetStateAction<ProgressedIndexesType>>

}

type ModalContextsProviderTypes = {
    children: React.ReactNode
}

export const SingleExerciseProgressionProvider = ({children}:ModalContextsProviderTypes) => {
    const[seriesIndexesThatMetGoal,setSeriesIndexesThatMetGoal] = useState<ProgressedIndexesType>({goals:[],series:[]})
    return(
        <SingleExerciseProgressionContext.Provider value={{
            seriesIndexesThatMetGoal,
            setSeriesIndexesThatMetGoal
            }}>
                {children}
        </SingleExerciseProgressionContext.Provider>
    )
}