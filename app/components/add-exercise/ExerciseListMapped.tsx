'use client'
import { useContext, useState } from 'react'
import { ListExercises } from './ListExercises'
import { ExerciceTypes, UserExercise } from '@/app/types'
import { FilteredExercises } from './FilteredExercises'
import { SearchExercises } from './SearchExercises'
import { ThemeContext } from '@/app/context/ThemeContext'

type ExerciseListMappedTypes = {
  exercises:ExerciceTypes,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const ExerciseListMapped = ({exercises,allExercisesInOneArray}:ExerciseListMappedTypes) => {
  const[searchField,setSearchField] = useState('')
  const theme = useContext(ThemeContext)
  return (
    <div className='flex flex-col mb-20 mx-5'>
        <input type="text" placeholder='Szukaj' value={searchField} id="Szukaj" onChange={e=>setSearchField(e.target.value)} className={` text-xl mt-10 mb-5 py-2 px-2 bg-${theme?.colorPallete.primary} border-2 rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
        {
        searchField
        ?
        <SearchExercises allExercisesInOneArray={allExercisesInOneArray} searchTerm={searchField}/>
        :
        <ListExercises item={exercises}/>
        }
    </div>
  )
}

