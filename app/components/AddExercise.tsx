'use client'
import React, { useEffect, useState, useContext, useReducer, useRef } from 'react'
import { ActionTypes, AddExerciceReducerType, Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../actions'
import { usePathname } from 'next/navigation'
import { ThemeContext } from '../context/ThemeContext'
import { AddExerciceReducer } from '../lib/reducers'

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
           <WeightAndRepeatInputs dispach={dispach} state={state}/>
           <DifficultyLevel dispach={dispach}/>
            
            <button onClick={e=>{e.preventDefault();AddSeries();console.log(state)}} className={`mt-4 text-xl border-white bg-[${theme?.colorPallete.secondary}] text-white border-2 rounded-md py-2`}>Dodaj serie</button>
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
    const inputRef = useRef<HTMLInputElement|null>(null)

    const theme = useContext(ThemeContext)
    return(
        <input type="number" className={`text-[${theme?.colorPallete.accent}] border-slate-500 bg-[${theme?.colorPallete.primary}] border-2 min-h-10 text-xl rounded-md pl-4 focus:outline-blue-500`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
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

const WeightAndRepeatInputs = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {
    return (
        <div className='flex items-center'>
            <div className='flex flex-col w-1/2'>
                <Label htmlFor='weight'>Ciężar</Label>
                <Input type="number" id='weight' onChange={e=>dispach({type:"WEIGHT",payload:Number(e.target.value)})} value={state.weight} min={1}/>
            </div>

            <div className='flex flex-col w-1/2'>
                <Label htmlFor='repeat'>Powtórzenia</Label>
                <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
            </div>
        </div>
    )
}

const DifficultyLevel = ({dispach}:{dispach:React.Dispatch<ActionTypes>}) => {
    const theme = useContext(ThemeContext)
    return(<div className='flex flex-col'>
        <label htmlFor='difficulty' className={`text-[${theme?.colorPallete.accent}]`}>Ciężkość serii</label>
        <select name="difficulty" id="difficulty" className={`bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-slate-500 border-2 rounded-md h-10`} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
            <option value="easy">Łatwa</option>
            <option value="medium">Średnia</option>
            <option value="hard">Trudna</option>
        </select>
        </div>)
}