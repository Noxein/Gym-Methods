import { UserExercise } from '@/app/types'
import React from 'react'
import { LinkToExercise } from './LinkToExercise'

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
}
export const FilteredExercises = ({allExercisesInOneArray}:FilteredExercisesTypes) => {
    return (
        <div className='mx-auto flex flex-col gap-2 w-full'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <LinkToExercise mLeft='ml-2' isFirst={i===0} text={x.exercisename}/>
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <LinkToExercise mLeft='ml-2' isFirst={i===0} text={x}/>
                    )
                }
            })}
        </div>
      )
}