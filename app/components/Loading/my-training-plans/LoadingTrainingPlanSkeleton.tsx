'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext } from 'react'

export const LoadingTrainingPlanSkeleton = () => {
  const theme = useContext(ThemeContext)
  return (
    <div className='mx-5 mb-20'>
      <div className='flex flex-col gap-2 mt-5'>
        <div className={`w-full bg-[${theme?.colorPallete.primary}] border-${theme?.colorPallete.accent} border-2 rounded-md py-3 px-2`} >
        <span className='invisible'>o</span>
        </div>
        <div className={`text-[${theme?.colorPallete.accent}] rounded-md border-2 border-[${theme?.colorPallete.accent}] bg-[${theme?.colorPallete.primary}] px-2 py-3 `}>
        <span className='invisible'>o</span>
        </div>
      </div>

      <div className='mt-10 flex-col flex'>
        <div className={`text-left px-2 pr-4 w-full bg-gray-600 text-[${theme?.colorPallete.accent}] rounded-md py-3 flex justify-between text-opacity-0 mb-1`}>
          <span className='invisible'>o</span>
        </div>

        <LoadingExerciseElement opacity={3}/>
        <LoadingExerciseElement opacity={2}/>
        <LoadingExerciseElement opacity={1}/>

        <div className={`border-[${theme?.colorPallete.accent}] border-2 my-2 py-4 px-2 rounded-md flex border-opacity-20` }>
          <span className='invisible'>o</span>
        </div>
      </div>

    </div>
  )
}

const LoadingExerciseElement = ({opacity}:{opacity:number}) => {
  const theme = useContext(ThemeContext)
  return(
    <div className={`border-[${theme?.colorPallete.accent}] border-2 my-1 py-4 px-2 rounded-md flex ${opacity===3?'border-opacity-80':opacity===2?'border-opacity-60':'border-opacity-40'}` }>
      <span className='invisible'>o</span>
    </div>
  )
}