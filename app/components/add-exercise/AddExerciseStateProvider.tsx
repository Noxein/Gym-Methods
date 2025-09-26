'use client'
import { useEffect, useReducer } from 'react'
import { AddExercise } from './AddExercise'
import { ActionTypes, AddExerciceReducerType, InputsType, Progression } from '@/app/types'
import { AddExerciceReducer } from '@/app/lib/reducers'
import { TimerContextProvider } from '@/app/context/TimerContext'
import { SingleExerciseProgressionProvider } from '@/app/context/SingleExerciseProgressionContext'

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
    showTimeMesure: boolean,
    exerciseid:string,
    requiresHandle: boolean,
    allHandles: {
      id: string;
      handlename: string;
    }[],
    exerciseProgression?: Progression,
}

const initalData = (exerciseName:string) => {
  let init = {
    weight: 0,
    repeat: 0,
    side: 'Both',
    series:[],
    difficultyLevel: "easy",
    time: 0
  } as AddExerciceReducerType

  const data = localStorage.getItem(exerciseName+'singleExerciseMemoryData')
  if(!data) return init

  const parsedData = JSON.parse(data) as InputsType
  init.difficultyLevel = parsedData.difficultyLevel
  init.repeat = parsedData.repeat
  init.side = parsedData.side
  init.time = parsedData.time
  init.weight = parsedData.weight

  return init
}

export const AddExerciseStateProvider = ({name,showTimeMesure,exerciseid,requiresHandle,allHandles,exerciseProgression}:AddExerciseStateProviderTypes) => {
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,initalData(name))
    useEffect(()=>{
      const data = localStorage.getItem('lastexercises')

      if(!data){
        localStorage.setItem('lastexercises',JSON.stringify([name]))
        return
      } 

      const parsedData: string[] = JSON.parse(data)

      if(parsedData.includes(name)) return
      if(parsedData.length === 1) return localStorage.setItem('lastexercises',JSON.stringify([name,parsedData[0]]))

      localStorage.setItem('lastexercises',JSON.stringify([name,parsedData[0]]))

    },[])

  return (
    <TimerContextProvider>
      <SingleExerciseProgressionProvider>
        <AddExercise name={name} exerciseid={exerciseid} showTimeMesure={showTimeMesure} dispatch={dispatch} state={state} requiresHandle={requiresHandle} allHandles={allHandles} exerciseProgression={exerciseProgression}/>
      </SingleExerciseProgressionProvider>
    </TimerContextProvider>
  )
}
