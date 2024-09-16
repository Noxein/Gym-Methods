'use client'
import React, { useReducer } from 'react'
import { AddExercise } from './AddExercise'
import { ActionTypes, AddExerciceReducerType } from '@/app/types'
import { AddExerciceReducer } from '@/app/lib/reducers'

const init = {
    weight: 0,
    repeat: 0,
    tempoUp: 0,
    tempoDown: 0,
    side: 'Both' as const,
    series:[],
    difficultyLevel: "easy" as const,
    time: ''
}

type AddExerciseStateProviderTypes = {
    name: string,
    showTempo: boolean,
    showTimeMesure: boolean,
}
export const AddExerciseStateProvider = ({name,showTempo,showTimeMesure}:AddExerciseStateProviderTypes) => {
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
  return (
    <AddExercise name={name} showTempo={showTempo} showTimeMesure={showTimeMesure} dispatch={dispatch} state={state}/>
  )
}
