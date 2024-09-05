import { ThemeContext } from '@/app/context/ThemeContext'
import { ExerciseTypes, UserExercise } from '@/app/types'
import React, { useContext, useState } from 'react'
import { ListExercises } from './ListExercises'
import { SelectExercise } from './SelectExercise'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { Icon } from '../../Icon'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { SelectedExerciseContext } from './SelectedExerciseContext'

type ExerciseListTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
}

export const ExerciseList = ({exerciseList,exercises}:ExerciseListTypes) => {
    const [searchField,setSearchField] = useState('')
    const theme = useContext(ThemeContext)
    const searchExercise = useContext(SelectedExerciseContext)
    const setShowExerciseList = searchExercise?.setShowExerciseList

    const hideList = () => {
        setShowExerciseList && setShowExerciseList(false)
    }
  return (
        <div className='fixed min-h-screen left-0 top-0 w-screen z-20 backdrop-blur-sm flex flex-col overflow-auto bottom-20 px-5'>
                <div className='flex items-center my-5'>
                    <button className='flex justify-center px-2' onClick={hideList}>
                        <Icon className='flex justify-center items-center'>
                            <LeftAngle height='30' width='30'/>
                        </Icon>
                    </button>
                    <input type="text" placeholder='Szukaj' value={searchField} id="Szukaj" onChange={e=>setSearchField(e.target.value)} className={`flex-1 w-full text-xl py-2 px-2 bg-${theme?.colorPallete.primary} border-2 rounded-md border-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent}`}/>
                </div>
               
                {
                    searchField
                    ?
                    <SearchExercises allExercisesInOneArray={exerciseList} searchTerm={searchField}/>
                    :
                    <ListExercises item={exercises}/>
                }
        </div>
  )
}

type SearchExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string
}

export const SearchExercises = ({allExercisesInOneArray,searchTerm}:SearchExercisesTypes) => {
    const filtered = allExercisesInOneArray.filter(x=>{
        if(typeof x === 'object'){
          return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
        }
        if(typeof x === 'string'){
          return x.toLowerCase().includes(searchTerm.toLowerCase())
        }
      })
  return (
    <FilteredExercises allExercisesInOneArray={filtered} />
  )
}

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
}

export const FilteredExercises = ({allExercisesInOneArray}:FilteredExercisesTypes) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <SelectExercise mLeft='ml-2' isFirst={i===0} text={x.exercisename} key={i}/>
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <SelectExercise mLeft='ml-2' isFirst={i===0} text={x} key={i}/>
                    )
                }
            })}
        </div>
      )
}
