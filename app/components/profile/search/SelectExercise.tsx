import { useContext } from 'react'
import { SelectedExerciseContext } from './SelectedExerciseContext'

type SelectExerciseType = {
    text: string,
    mLeft: string,
    isFirst: boolean,
}

export const SelectExercise = ({text,mLeft,isFirst}:SelectExerciseType) => {
    const searchExercise = useContext(SelectedExerciseContext)
    const setSelectedExercise = searchExercise?.setExercise
    const setShowExerciseList = searchExercise?.setShowExerciseList

    const handleClick = () => {
        setSelectedExercise && setSelectedExercise(text)
        setShowExerciseList && setShowExerciseList(false)
    }
    return(
    <button onClick={handleClick} className={`relative text-left ml-${mLeft} bg-marmur text-marmur border-marmur border-[1px] rounded flex justify-between ${isFirst?'mt-2':null}`}>
        <span className={`flex-1 bg-dark rounded-md pl-4 py-2 flex flex-col`}>
            {text}
        </span>
    </button>
)
}
