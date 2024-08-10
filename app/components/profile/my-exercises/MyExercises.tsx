'use client'
import { UserExercise } from '@/app/types'
import React, { useState } from 'react'
import { ListExercises } from './ListExercises'
import { Search } from './Search'

export const MyExercises = ({exercises}:{exercises:UserExercise[]}) => {
  const[searchValue,setSearchValue] = useState('')
  return (
    <div className='px-4 pt-20'>
        <Search setSearchValue={setSearchValue}/>
        <ListExercises exercises={exercises.filter(x=>x.exercicename.toLowerCase().includes(searchValue.toLowerCase()))}/>
    </div>
  )
}
