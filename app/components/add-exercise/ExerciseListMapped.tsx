'use client'
import { useEffect, useState } from 'react'
import { ListExercises } from './ListExercises'
import { ExerciseTypes, UserExercise } from '@/app/types'
import { SearchExercises } from './SearchExercises'
import Link from 'next/link'
import { LinkToExercise } from './LinkToExercise'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'
import { exercisesArr } from '@/app/lib/exercise-list'

type ExerciseListMappedTypes = {
  exercises:ExerciseTypes,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const ExerciseListMapped = ({exercises,allExercisesInOneArray}:ExerciseListMappedTypes) => {
  const[searchField,setSearchField] = useState('')
  const[lastExercises,setLastExercises] = useState<string[]>([])
  useEffect(()=>{
    const lastExercisesA = localStorage.getItem('lastexercises')
    if(!lastExercisesA) return

    const parsedData: string[] = JSON.parse(lastExercisesA)
    setLastExercises(parsedData)
  },[])

  const t = useTranslations('Home/Add-Exercise')
  const u = useTranslations('Utils')
  const d = useTranslations('DefaultExercises')
  
  return (
    <div className='flex flex-col mb-20 mt-10'>
        <h1 className='text-white text-center text-2xl'>{t('AddExercise')}</h1>

      <div className='flex gap-2 my-5 max-w-[100dvw] mx-5'>        
        <input type="text" placeholder={u('Search')} value={searchField} id={u('Search')} onChange={e=>setSearchField(e.target.value)} className={`w-3/4 text-xl py-2 px-2 bg-dark border-2 rounded-md border-borderInteractive text-white placeholder:text-gray-300`}/>
        <Link href={`/home/profile/my-exercises?showAddModal=true`} className='bg-green flex-1 text-white justify-center flex items-center px-4 rounded-lg'>
          {u('Add')}
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
            {t('LatestExercises')}
            {lastExercises.map((exercise,index)=>{
              const text = exercisesArr.includes(exercise) ? d(nameTrimmer(exercise)) : exercise
              return <LinkToExercise isFirst={index===0} mLeft={'0'} key={index} text={text} leadTo={exercise}/>
            })}
          </div>
      </div>
    </div>
  )
}

