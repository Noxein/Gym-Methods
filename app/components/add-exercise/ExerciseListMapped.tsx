'use client'
import { useContext, useState } from 'react'
import { ListExercises } from './ListExercises'
import { ExerciseTypes, UserExercise } from '@/app/types'
import { SearchExercises } from './SearchExercises'
import { ThemeContext } from '@/app/context/ThemeContext'
import Link from 'next/link'

type ExerciseListMappedTypes = {
  exercises:ExerciseTypes,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const ExerciseListMapped = ({exercises,allExercisesInOneArray}:ExerciseListMappedTypes) => {
  const[searchField,setSearchField] = useState('')
  const theme = useContext(ThemeContext)
  return (
    <div className='flex flex-col mb-20 mx-5 mt-10'>
        <h1 className='text-white text-center text-2xl'>DODAJ ĆWICZENIE</h1>
      <div className='flex gap-2 my-5'>        
        <input type="text" placeholder='Szukaj' value={searchField} id="Szukaj" onChange={e=>setSearchField(e.target.value)} className={`flex-1 text-xl py-2 px-2 bg-${theme?.colorPallete.primary} border-2 rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
        <Link href={`/home/profile/my-exercises?showAddModal=true`} className='bg-green text-white flex items-center px-10 rounded-lg'>
          DODAJ
        </Link>
      </div>
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

