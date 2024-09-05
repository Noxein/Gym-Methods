import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext } from 'react'
import { SelectedExerciseContext } from './SelectedExerciseContext'

type SelectExerciseType = {
    text: string,
    mLeft: string,
    isFirst: boolean,
}

export const SelectExercise = ({text,mLeft,isFirst}:SelectExerciseType) => {
    const theme = useContext(ThemeContext)
    const searchExercise = useContext(SelectedExerciseContext)
    const setSelectedExercise = searchExercise?.setExercise
    const setShowExerciseList = searchExercise?.setShowExerciseList

    const handleClick = () => {
        setSelectedExercise && setSelectedExercise(text)
        setShowExerciseList && setShowExerciseList(false)
    }
    return(
    <button onClick={handleClick} className={`relative text-left ml-${mLeft} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} border-[1px] rounded flex justify-between ${isFirst?'mt-2':null}`}>
        <span className={`flex-1 bg-${theme?.colorPallete.primary} rounded-md pl-4 py-2 flex flex-col`}>
            {text}
        </span>
    </button>
)
}
