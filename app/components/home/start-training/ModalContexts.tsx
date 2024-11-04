'use client'
import { createContext, useState } from "react";

export const ModalContexts = createContext<ModalContextsTypes|null>(null)

type ModalContextsTypes = {
    showExerciseList: boolean,
    setShowExerciseList: a,
    showAddExerciseModal: boolean,
    setShowAddExerciseModal: a,
    showPreviousExercise: boolean,
    setShowPreviousExercise: a,
}

type a = React.Dispatch<React.SetStateAction<boolean>>

type ModalContextsProviderTypes = {
    children: React.ReactNode
}

export const ModalContextsProvider = ({children}:ModalContextsProviderTypes) => {
    const[showExerciseList,setShowExerciseList] = useState(false)
    const[showAddExerciseModal,setShowAddExerciseModal] = useState(false)
    const[showPreviousExercise,setShowPreviousExercise] = useState(false)

    return(
        <ModalContexts.Provider value={{showExerciseList,setShowExerciseList,showAddExerciseModal,setShowAddExerciseModal,showPreviousExercise,setShowPreviousExercise}}>
            {children}
        </ModalContexts.Provider>
    )
}