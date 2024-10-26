'use client'
import React, { useEffect, useReducer } from 'react'
import { AddExercise } from './AddExercise'
import { ActionTypes, AddExerciceReducerType } from '@/app/types'
import { AddExerciceReducer } from '@/app/lib/reducers'

const init = {
    weight: 0,
    repeat: 0,
    side: 'Both' as const,
    series:[],
    difficultyLevel: "easy" as const,
    time: ''
}

type AddExerciseStateProviderTypes = {
    name: string,
    showTimeMesure: boolean,
    exerciseid:string,
    requiresHandle: boolean,
    allHandles: {
      id: string;
      handlename: string;
    }[]
}
export const AddExerciseStateProvider = ({name,showTimeMesure,exerciseid,requiresHandle,allHandles}:AddExerciseStateProviderTypes) => {
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
    useEffect(()=>{
      const data = localStorage.getItem('lastexercises')
      if(!data){
        localStorage.setItem('lastexercises',JSON.stringify([name]))
        return
      } 
      const parsedData: string[] = JSON.parse(data)
      if(parsedData.length === 1) return localStorage.setItem('lastexercises',JSON.stringify([name,parsedData[0]]))
      localStorage.setItem('lastexercises',JSON.stringify([name,parsedData[0]]))
    },[])
  return (
    <AddExercise name={name} exerciseid={exerciseid} showTimeMesure={showTimeMesure} dispatch={dispatch} state={state} requiresHandle={requiresHandle} allHandles={allHandles}/>
  )
}
