import { useState } from 'react'
import { ExerciseTypes, LocalStorageTraining, TrainingExerciseType, UserExercise } from '@/app/types'
import { SearchExercisesTraining } from './SearchExercisesTraining'
import { ListExercisesTraining } from './ListExercisesTraining'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'
import { useExerciseTempos } from '@/app/lib/useExerciseTempos'
import { Input } from './Input'

type MapExercisesTypes = {
    exercisesObject:ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
    handleClose: (...params:any) => any,
    handleSelect: (id:string, name?:string) => void,
}

export const MapExercises = ({exercisesObject,allExercisesInOneArray,handleClose,handleSelect}:MapExercisesTypes) => {
    const[searchField,setSearchField] = useState('')
    const tempos = useExerciseTempos()
    
    const u = useTranslations("Utils")
    return (
        <div className='fixed left-0 top-0 w-screen backdrop-blur-sm flex justify-center overflow-auto bottom-[75px] z-[60]'>
            <div className={`flex flex-col w-mobile max-w-mobile overflow-y-auto`}>
                <div className={`flex pt-5 mb-5 items-center justify-center sticky top-0 left-0 bg-dark pb-2 border-b-[2px] border-borderInteractive`}>
                    <button onClick={handleClose}
                        className={`text-[marmur] flex items-center justify-center pl-2`}
                        title={u("Back")}
                        >
                            <LeftAngle fill='#D9D9D9' width='40' height='40'/>
                        </button>
                    <Input labelName={u("Search")} value={searchField} onChange={e=>setSearchField(e.target.value)}/>
                </div>
                {
                searchField
                ?
                <SearchExercisesTraining 
                    allExercisesInOneArray={allExercisesInOneArray} 
                    searchTerm={searchField}
                    handleSelect={handleSelect}
                    tempos={tempos}
                    />
                :
                <ListExercisesTraining 
                    item={exercisesObject}
                    handleSelect={handleSelect}
                    tempos={tempos}
                    />
                }
            </div>
        </div>
    )
}
