import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useState } from 'react'
import { ExerciseTypes, LocalStorageTraining, TrainingExerciseType, UserExercise } from '@/app/types'
import { SearchExercisesTraining } from './SearchExercisesTraining'
import { ListExercisesTraining } from './ListExercisesTraining'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type MapExercisesTypes = {
    exercisesObject:ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
    setPlanExercises?: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
    isTrainingInProgressPage?: boolean,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setLocalStorageTrainingData?: React.Dispatch<React.SetStateAction<LocalStorageTraining>>
}

export const MapExercises = ({exercisesObject,allExercisesInOneArray,setPlanExercises,setShowAddExercise,isTrainingInProgressPage = false,setShowExerciseList,setLocalStorageTrainingData}:MapExercisesTypes) => {
    const[searchField,setSearchField] = useState('')
    
    const CloseExercises = () => {
        setShowAddExercise && setShowAddExercise(false)
        HideShowHTMLScrollbar('show')
    }
    const theme = useContext(ThemeContext)
    return (
        <div className='fixed left-0 top-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
            <div className={`flex flex-col w-full overflow-y-auto`}>
                <div className={`flex pt-5 mb-5 items-center justify-center sticky top-0 left-0 bg-${theme?.colorPallete.primary} pb-2 border-b-[1px] border-${theme?.colorPallete.accent}`}>
                    <button onClick={CloseExercises}
                        className={`text-[${theme?.colorPallete.accent}] flex items-center justify-center pl-2`}
                        title='Powrót'
                        >
                            <LeftAngle fill='#D9D9D9' width='40' height='40'/>
                        </button>
                    <input type="text" placeholder='Szukaj' value={searchField} id="Szukaj" onChange={e=>setSearchField(e.target.value)} className={`flex-1 text-xl mx-2 py-2 px-2 bg-${theme?.colorPallete.primary} border-2 rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
                </div>
                {
                searchField
                ?
                <SearchExercisesTraining 
                    allExercisesInOneArray={allExercisesInOneArray} 
                    searchTerm={searchField} 
                    setPlanExercises={setPlanExercises} 
                    isTrainingInProgressPage={isTrainingInProgressPage} 
                    setShowExerciseList={setShowExerciseList}
                    setShowAddExercise={setShowAddExercise}
                    setLocalStorageTrainingData={setLocalStorageTrainingData}
                    />
                :
                <ListExercisesTraining 
                    item={exercisesObject} 
                    setPlanExercises={setPlanExercises} 
                    isTrainingInProgressPage={isTrainingInProgressPage} 
                    setShowExerciseList={setShowExerciseList}
                    setShowAddExercise={setShowAddExercise}
                    setLocalStorageTrainingData={setLocalStorageTrainingData}
                    />
                }
            </div>
        </div>
    )
}
