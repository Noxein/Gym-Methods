'use client'
import { ExerciseType } from "@/app/types";
import { createContext, useState } from "react";

export const ModalContexts = createContext<ModalContextsTypes|null>(null)

type ModalContextsTypes = {
    showExerciseList: boolean,
    setShowExerciseList: a,
    showAddExerciseModal: boolean,
    setShowAddExerciseModal: a,
    showPreviousExercise: boolean,
    setShowPreviousExercise: a,
    prevExerciseId: string,
    setPrevExerciseId: React.Dispatch<React.SetStateAction<string>>,
    prevExercise: ExerciseType | null,
    setPrevExercise: React.Dispatch<React.SetStateAction<ExerciseType | null>>,
}

type a = React.Dispatch<React.SetStateAction<boolean>>

type ModalContextsProviderTypes = {
    children: React.ReactNode
}

export const ModalContextsProvider = ({children}:ModalContextsProviderTypes) => {
    const[showExerciseList,setShowExerciseList] = useState(false)
    const[showAddExerciseModal,setShowAddExerciseModal] = useState(false)
    const[showPreviousExercise,setShowPreviousExercise] = useState(false)
    const[prevExerciseId,setPrevExerciseId] = useState('')
    const[prevExercise,setPrevExercise] = useState<ExerciseType|null>(null)
    return(
        <ModalContexts.Provider value={{showExerciseList,setShowExerciseList,showAddExerciseModal,setShowAddExerciseModal,showPreviousExercise,setShowPreviousExercise,prevExerciseId,setPrevExerciseId,prevExercise,setPrevExercise}}>
            {children}
        </ModalContexts.Provider>
    )
}