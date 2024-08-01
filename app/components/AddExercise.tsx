'use client'
import React, { useEffect, useState, useContext, useReducer } from 'react'
import { ActionTypes, AddExerciceReducerType, Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../actions'
import { usePathname } from 'next/navigation'
import { ThemeContext } from '../context/ThemeContext'
import { AddExerciceReducer } from '../lib/reducers'
import { ReducerWithoutAction} from 'react'

export const AddExercise = ({name,showTempo=false}:{name:string,showTempo:boolean}) => {
    const init = {
        weight: 0,
        repeat: 0,
        tempoUp: 0,
        tempoDown: 0,
        series:[],
        difficultyLevel: "easy" as const,
    }

    const[error,setError] = useState<string>('')
    const[state,dispach] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
    //todo make difficulty level picker
    const theme = useContext(ThemeContext)

    const pathname = usePathname()

    useEffect(()=>{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            dispach({type:"SETSERIESFROMMEMORY",payload:parsedData})
        }
    },[])
    const AddSeries = () => {
        dispach({type:'ADDSERIES'})
        localStorage.setItem(name,JSON.stringify([...state.series,{
            weight: state.weight,
            repeat: state.repeat,
            tempoUp: state.tempoUp,
            tempoDown: state.tempoDown,
        }]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem(name)
    }
    const FinishTraining = async () => {
        ResetLocalStorage()

        const possibleError = await AddExerciseAction(name,state.series,state.difficultyLevel,pathname.includes('training'))
        if(possibleError) {
            setError(possibleError.errors)
        }
    }
  return (
    <div className='px-4 pt-4'>
        <h1 className={`text-[${theme?.colorPallete.accent}] text-xl text-center border-b-2 border-b-[${theme?.colorPallete.secondary}] pb-2`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 bg-[${theme?.colorPallete.primary}] pt-2`}>
            {showTempo?<WithTempo dispach={dispach} state={state}/>:<WithoutTempo dispach={dispach} state={state}/>}
            

            <button onClick={e=>{e.preventDefault();AddSeries()}} className={`mt-6 text-xl border-white bg-[${theme?.colorPallete.secondary}] text-white border-2 rounded-md py-2`}>Dodaj serie</button>
        </div>

        <DisplayCurrentSeries seriesname={name} currentSeries={state.series} dispachSeries={dispach}/>

        {error && <div>
            {error}
            </div>}
        <button onClick={FinishTraining} className={`bottom-0 left-0 fixed mb-20 py-6 w-full text-xl bg-[${theme?.colorPallete.secondary}] text-white border-2 rounded-md`}>Zakończ ćwiczenie</button>
    </div>
    )
}

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {
    const theme = useContext(ThemeContext)
    return(
        <input type="number" className={`text-[${theme?.colorPallete.accent}] border-slate-500 bg-[${theme?.colorPallete.primary}] border-2 min-h-12 text-xl rounded-md pl-4 focus:outline-blue-500`} {...rest}/>
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-xl text-[${theme?.colorPallete.accent}] ${sClass}`} {...rest}></label>
    )
}

const WithoutTempo = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {
    return (
        <>
            <Label htmlFor='weight'>Ciężar</Label>
            <Input type="number" id='weight' onChange={e=>dispach({type:"WEIGHT",payload:Number(e.target.value)})} value={state.weight} min={1}/>

            <Label htmlFor='repeat' sClass='pt-2'>Powtórzenia</Label>
            <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
        </>
    )
}

const WithTempo = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {
    return(
        <div className='flex gap-2 w-full'>
            <div className='flex flex-col w-7/12'>
                <WithoutTempo dispach={dispach} state={state}/>
            </div>

            <div className='flex flex-col w-5/12'>
                <Label htmlFor='tempoup'>Tempo góra</Label>
                <Input type="number" id='tempoup' onChange={e=>dispach({type:"TEMPOUP",payload:Number(e.target.value)})} value={state.weight} min={1}/>

                <Label htmlFor='tempodown' sClass='pt-2'>Tempo dół</Label>
                <Input type="number" id='tempodown' onChange={e=>dispach({type:"TEMPODOWN",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
            </div>
        </div>
    )
}