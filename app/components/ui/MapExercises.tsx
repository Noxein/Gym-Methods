import { useState } from 'react'
import { ExerciseTypes, LocalStorageTraining, TrainingExerciseType, UserExercise } from '@/app/types'
import { SearchExercisesTraining } from './SearchExercisesTraining'
import { ListExercisesTraining } from './ListExercisesTraining'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'

type MapExercisesTypes = {
    exercisesObject:ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
    handleClose: (...params:any) => any,
    handleSelect: (name:string) => void,
}

export const MapExercises = ({exercisesObject,allExercisesInOneArray,handleClose,handleSelect}:MapExercisesTypes) => {
    const[searchField,setSearchField] = useState('')
    
    const u = useTranslations("Utils")
    return (
        <div className='fixed left-0 top-0 w-screen backdrop-blur-sm flex justify-center overflow-auto bottom-20 z-[60]'>
            <div className={`flex flex-col w-full overflow-y-auto`}>
                <div className={`flex pt-5 mb-5 items-center justify-center sticky top-0 left-0 bg-dark pb-2 border-b-[2px] border-borderInteractive`}>
                    <button onClick={handleClose}
                        className={`text-[marmur] flex items-center justify-center pl-2`}
                        title={u("Back")}
                        >
                            <LeftAngle fill='#D9D9D9' width='40' height='40'/>
                        </button>
                    <input type="text" placeholder={u("Search")} value={searchField} id={u("Search")} onChange={e=>setSearchField(e.target.value)} className={`flex-1 text-xl mx-2 py-2 px-2 bg-dark border-2 rounded-md border-borderInteractive text-white placeholder:text-gray-300`}/>
                </div>
                {
                searchField
                ?
                <SearchExercisesTraining 
                    allExercisesInOneArray={allExercisesInOneArray} 
                    searchTerm={searchField}
                    handleSelect={handleSelect}
                    />
                :
                <ListExercisesTraining 
                    item={exercisesObject}
                    handleSelect={handleSelect}
                    />
                }
            </div>
        </div>
    )
}
