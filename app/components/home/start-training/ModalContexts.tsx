'use client'
import { getProgressedSeriesIndexes } from "@/app/lib/utils";
import { LocalStorageTraining, ProgressedIndexesType, Progression } from "@/app/types";
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
    seriesIndexesThatMetGoal: ProgressedIndexesType,
    setSeriesIndexesThatMetGoal: React.Dispatch<React.SetStateAction<ProgressedIndexesType>>

}

type StateDispacherType = React.Dispatch<React.SetStateAction<boolean>>

type ModalContextsProviderTypes = {
    children: React.ReactNode,
    progressions: Progression[],
    trainingName: string,
}

export const ModalContextsProvider = ({children, progressions, trainingName}:ModalContextsProviderTypes) => {
    
        const init = () => {
            const data = localStorage.getItem(trainingName+'training')
            if(data){
                const parsedData = JSON.parse(data) as LocalStorageTraining
                const index = parsedData.currentExerciseIndex
                const goal = progressions.find(x=>x.exercisename === parsedData.exercises[index].exerciseName)
                let indexes:ProgressedIndexesType = getProgressedSeriesIndexes(parsedData.exercises[index].sets,goal)
                return indexes
            }
            return {goals:[],series:[]}
    }

    const[showExerciseList,setShowExerciseList] = useState(false)
    const[showAddExerciseModal,setShowAddExerciseModal] = useState(false)
    const[showPreviousExercise,setShowPreviousExercise] = useState(false)
    const[showPlanProgressionModal,setShowPlanProgressionModal] = useState(false)
    const[seriesIndexesThatMetGoal,setSeriesIndexesThatMetGoal] = useState<ProgressedIndexesType>(init)



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