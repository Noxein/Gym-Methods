'use client'
import { createContext, useState } from "react";

export const SelectedExerciseContext = createContext<null|dataTypes>(null)

type dataTypes = {
    exercise: string,
    setExercise: React.Dispatch<React.SetStateAction<string>>, 
    showExerciseList: boolean,
    setShowExerciseList: React.Dispatch<React.SetStateAction<boolean>>,
}

export const SelectedExerciseContextProvider = ({children}:{children:React.ReactNode}) => {
    const[exercise,setExercise] = useState('')
    const[showExerciseList,setShowExerciseList] = useState(false)
    return (
        <SelectedExerciseContext.Provider value={{exercise,setExercise,showExerciseList,setShowExerciseList}}>
            {children}
        </SelectedExerciseContext.Provider>
    )
}