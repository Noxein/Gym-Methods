'use client'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { ActionTypes, AddExerciceReducerType, Series } from '../../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../../actions'
import { usePathname } from 'next/navigation'
import { ThemeContext } from '../../context/ThemeContext'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'

type AddExerciseType = {
    name:string,
    showTempo:boolean,
    showTimeMesure:boolean,
    isTraining?: boolean,
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
    isLoading?: boolean,
}

export const AddExercise = ({name,showTempo=false,showTimeMesure,isTraining=false,state,dispatch,isLoading= false}:AddExerciseType) => {

    const[error,setError] = useState<string>('')
    const theme = useContext(ThemeContext)

    const pathname = usePathname()

    useEffect(()=>{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData})
        }
    },[])
    const AddSeries = () => {
        dispatch({type:'ADDSERIES'})
        localStorage.setItem(name,JSON.stringify([...state.series,{
            weight: state.weight,
            repeat: state.repeat,
            tempoUp: state.tempoUp,
            tempoDown: state.tempoDown,
            time: state.time,
        }]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem(name)
    }
    const FinishTraining = async () => {
        ResetLocalStorage()

        const possibleError = await AddExerciseAction(true,name,state.series,state.difficultyLevel,pathname.includes('training'))
        if(possibleError) {
            setError(possibleError.errors)
        }
    }
  return (
    <div className='px-4 pt-4'>
        <h1 className={`text-${theme?.colorPallete.accent} text-xl text-center font-medium`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs dispach={dispatch} state={state}/>
               <DifficultyLevel dispach={dispatch} state={state} showTimeMesure={showTimeMesure}/>
            </div>
            
            <button onClick={e=>{e.preventDefault();AddSeries()}} className={`mt-6 text-xl bg-green text-white rounded-md py-4 flex items-center justify-between px-5 `} disabled={isLoading}>
                Dodaj serie
                <Icon className='bg-opacity-0 flex'>
                    <PlusIcon /> 
                </Icon>
            </button>
        </div>

        <DisplayCurrentSeries seriesname={name} currentSeries={state.series} dispachSeries={dispatch} showTimeMesure={showTimeMesure}/>

        {error && <div>
            {error}
            </div>}
        {!isTraining && <button onClick={FinishTraining} className={`bottom-0 left-0 fixed mb-20 py-6 w-full text-xl bg-${theme?.colorPallete.secondary} text-white border-2 rounded-md`}>Zakończ ćwiczenie</button>}
    </div>
    )
}

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    const theme = useContext(ThemeContext)
    return(
        <input  className={` w-full text-${theme?.colorPallete.accent} border-white bg-${theme?.colorPallete.primary} border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-blue-500`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}

const WeightAndRepeatInputs = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>Ciężar</Label>
                <Input type="number" id='weight' onChange={e=>dispach({type:"WEIGHT",payload:Number(e.target.value)})} value={state.weight} min={1}/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>Powtórzenia</Label>
                <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
            </div>
        </div>
    )
}

const DifficultyLevel = ({dispach,state,showTimeMesure}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType,showTimeMesure:boolean}) => {
    const theme = useContext(ThemeContext)
    return(<div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-${theme?.colorPallete.accent} font-light text-sm px-2 absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary}`}>Ciężkość serii</label>
            <select name="difficulty" id="difficulty" className={`bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} border-white border-[1px] rounded-md h-10`} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
                <option value="easy">Łatwa</option>
                <option value="medium">Średnia</option>
                <option value="hard">Trudna</option>
            </select>
        </div>
        {showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>Czas</Label>
                <Input type="text" id='time' onChange={e=>dispach({type:"TIME",payload:e.target.value})} value={state.time}/>
            </div>}
        </div>)
}