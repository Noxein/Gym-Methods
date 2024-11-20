'use client'
import { UserExercise } from '@/app/types'
import { useState } from 'react'
import { ListExercises } from './ListExercises'
import { Search } from './Search'
import { useTranslations } from 'use-intl'

export const MyExercises = ({exercises,showAddModal}:{exercises:UserExercise[],showAddModal:boolean}) => {
  const[searchValue,setSearchValue] = useState('')
  const t = useTranslations("Home/Profile/My-Exercises")
  return (
    <div className='px-5 pt-10'>
      <h1 className='text-white mb-5 text-center text-2xl'>{t("MyExercises")}</h1>
        <Search setSearchValue={setSearchValue} showAddModal={showAddModal}/>
        <ListExercises exercises={exercises.filter(x=>x.exercisename.toLowerCase().includes(searchValue.toLowerCase()))}/>
    </div>
  )
}
