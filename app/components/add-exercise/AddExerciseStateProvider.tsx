'use client'
import { useRef } from 'react'
import { AddExercise } from './AddExercise'
import { TimerContextProvider } from '@/app/context/TimerContext'
import { SingleExerciseProgressionProvider } from '@/app/context/SingleExerciseProgressionContext'
import { ExerciseDataContextProvider } from '@/app/context/ExerciseDataContext'

const init = {
    weight: 0,
    repeat: 0,
    side: 'Both' as const,
    series:[],
    difficultyLevel: "easy" as const,
    time: 0
}

type AddExerciseStateProviderTypes = {
    name: string,
}



export const AddExerciseStateProvider = ({name}:AddExerciseStateProviderTypes) => {
  
  const func = () => {
      const data = localStorage.getItem('twoRecentExercises')

      if(!data){
        localStorage.setItem('twoRecentExercises',JSON.stringify([name]))
        return [name]
      } 

      const parsedData: string[] = JSON.parse(data)

      if(parsedData.includes(name)){
        return parsedData
      }

      if(parsedData.length === 1){
        localStorage.setItem('twoRecentExercises',JSON.stringify([name,parsedData[0]]))
        return [name,parsedData[0]]
        
      } 

      localStorage.setItem('twoRecentExercises',JSON.stringify([name,parsedData[0]]))
      return [name,parsedData[0]]

  }
  const twoRecentExercises = useRef<string[]>(func())


  return (
    <ExerciseDataContextProvider twoRecentExercises={twoRecentExercises.current}>
      <TimerContextProvider>
        <SingleExerciseProgressionProvider>
          <AddExercise />
        </SingleExerciseProgressionProvider>
      </TimerContextProvider>
    </ExerciseDataContextProvider>
  )
}
