'use client'
import { createContext, useState } from "react";

export const ModalContexts = createContext<ModalContextsTypes|null>(null)

type ModalContextsTypes = {
    showExerciseList: boolean,
    setShowExerciseList: StateDispacherType,
    showAddExerciseModal: boolean,
    setShowAddExerciseModal: StateDispacherType,
    showPreviousExercise: boolean,
    setShowPreviousExercise: StateDispacherType,
    showPlanProgressionModal: boolean,
    setShowPlanProgressionModal: StateDispacherType,
    seriesIndexesThatMetGoal: number[],
    setSeriesIndexesThatMetGoal: React.Dispatch<React.SetStateAction<number[]>>

}

type StateDispacherType = React.Dispatch<React.SetStateAction<boolean>>

type ModalContextsProviderTypes = {
    children: React.ReactNode
}

export const ModalContextsProvider = ({children}:ModalContextsProviderTypes) => {
    const[showExerciseList,setShowExerciseList] = useState(false)
    const[showAddExerciseModal,setShowAddExerciseModal] = useState(false)
    const[showPreviousExercise,setShowPreviousExercise] = useState(false)
    const[showPlanProgressionModal,setShowPlanProgressionModal] = useState(false)
    const[seriesIndexesThatMetGoal,setSeriesIndexesThatMetGoal] = useState<number[]>([])

    return(
        <ModalContexts.Provider value={{
            showExerciseList,
            setShowExerciseList,
            showAddExerciseModal,
            setShowAddExerciseModal,
            showPreviousExercise,
            setShowPreviousExercise,
            showPlanProgressionModal,
            setShowPlanProgressionModal,
            seriesIndexesThatMetGoal,
            setSeriesIndexesThatMetGoal
            }}>
                {children}
        </ModalContexts.Provider>
    )
}