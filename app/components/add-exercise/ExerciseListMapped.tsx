'use client'
import { use, useContext, useEffect, useState } from 'react'
import { ListExercises } from './ListExercises'
import { ExerciseTypes, UserExercise } from '@/app/types'
import { SearchExercises } from './SearchExercises'
import { ThemeContext } from '@/app/context/ThemeContext'
import Link from 'next/link'
import { LinkToExercise } from './LinkToExercise'
import { createTrainingPlans } from '@/app/actions'
import { LinkWithIcon } from '../ui/LinkWithIcon'

type ExerciseListMappedTypes = {
  exercises:ExerciseTypes,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const ExerciseListMapped = ({exercises,allExercisesInOneArray}:ExerciseListMappedTypes) => {
  const[searchField,setSearchField] = useState('')
  const[lastExercises,setLastExercises] = useState<string[]>([])
  const theme = useContext(ThemeContext)
  useEffect(()=>{
    const lastExercisesA = localStorage.getItem('lastexercises')
    if(!lastExercisesA) return

    const parsedData: string[] = JSON.parse(lastExercisesA)
    setLastExercises(parsedData)
  },[])

  return (
    <div className='flex flex-col mb-20 mt-10'>
        <h1 className='text-white text-center text-2xl'>DODAJ ĆWICZENIE</h1>

      <div className='flex gap-2 my-5 max-w-[100dvw] mx-5'>        
        <input type="text" placeholder='Szukaj' value={searchField} id="Szukaj" onChange={e=>setSearchField(e.target.value)} className={`w-3/4 text-xl py-2 px-2 bg-${theme?.colorPallete.primary} border-2 rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
        <Link href={`/home/profile/my-exercises?showAddModal=true`} className='bg-green flex-1 text-white justify-center flex items-center px-4 rounded-lg'>
          DODAJ
        </Link>

    </div>
      <div className='mx-5'>
          {
          searchField
          ?
          <SearchExercises allExercisesInOneArray={allExercisesInOneArray} searchTerm={searchField}/>
          :
          <ListExercises item={exercises}/>
          }
          <div className='mt-20 flex flex-col gap-3 text-white text-center text-xl'>
            OSTATNIE ĆWICZENIA
            {lastExercises.map((exercise,index)=>(
              <LinkToExercise isFirst={index===0} mLeft={'0'} key={index} text={exercise}/>
            ))}
          </div>
      </div>
    </div>
  )
}

