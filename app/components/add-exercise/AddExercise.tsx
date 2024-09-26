'use client'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { ActionTypes, AddExerciceReducerType, Series, Side as SideType } from '../../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../../actions'
import { usePathname } from 'next/navigation'
import { ThemeContext } from '../../context/ThemeContext'
import { Icon } from '../Icon'
import { CheckIcon, PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { TempoContext } from '@/app/context/TempoContext'
import { ShowHistoryButton } from './ShowHistoryButton'
import { PreviousExercise } from '../home/start-training/PreviousExercise'

type AddExerciseType = {
    name:string,
    showTempo:boolean,
    showTimeMesure:boolean,
    isTraining?: boolean,
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
    isLoading?: boolean,
    exerciseid: string
}

export const AddExercise = ({name,showTempo=false,showTimeMesure,isTraining=false,state,dispatch,isLoading= false,exerciseid}:AddExerciseType) => {
    console.log(name)
    const[error,setError] = useState<string>('')
    const[showHistory,setShowHistory] = useState(false)
    const[checked,setChecked] = useState(false)
    const theme = useContext(ThemeContext)
    const tempos = useContext(TempoContext)

    const pathname = usePathname()

    useEffect(()=>{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData})
        }
    },[name])
    const AddSeries = () => {
        dispatch({type:'ADDSERIES'})
        localStorage.setItem(name,JSON.stringify([...state.series,{
            weight: state.weight,
            repeat: state.repeat,
            tempoUp: state.tempoUp,
            tempoDown: state.tempoDown,
            time: state.time,
            side: state.side
        }]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem(name)
    }
    const FinishTraining = async () => {
        if(!checked) return
        ResetLocalStorage()

        const possibleError = await AddExerciseAction(true,name,state.series,pathname.includes('training'))
        if(possibleError) {
            setError(possibleError.errors)
        }
    }
    console.log(checked)
  return (
    <div className={`px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'}`}>
        <h1 className={`text-${theme?.colorPallete.accent} text-xl text-center font-medium`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs dispach={dispatch} state={state}/>
               <DifficultyLevel dispach={dispatch} state={state} showTimeMesure={showTimeMesure}/>
               <Side dispach={dispatch} state={state} />
            </div>
            
            <button onClick={e=>{e.preventDefault();AddSeries()}} className={`mt-6 text-xl bg-green text-white rounded-md py-4 flex items-center justify-between px-5 `} disabled={isLoading}>
                Dodaj serie
                <Icon className='bg-opacity-0 flex'>
                    <PlusIcon /> 
                </Icon>
            </button>
        </div>

        <DisplayCurrentSeries seriesname={name} currentSeries={state.series} dispatchSeries={dispatch} isTraining={isTraining} showTimeMesure={showTimeMesure}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} />}

        {error && <div>
            {error}
            </div>}
        {!isTraining && 
        <div className='flex w-full gap-2 mt-auto pt-4'>
            <button  className='w-16 h-16 rounded accent-dark border-marmur border-2' onClick={()=>setChecked(x=>!x)}> 
            {checked?
                <Icon className='flex justify-center'>
                    <CheckIcon fill='#fff' height='40' width='40'/>
                </Icon>:
                null   
                }
            </button>

            <button onClick={FinishTraining} className={`py-4 flex-1 text-xl bg-dark text-white border-2 rounded-md`}>Zakończ ćwiczenie</button>
        </div>
        }
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
            <select name="difficulty" id="difficulty" className={`bg-${theme?.colorPallete.primary} pl-3 text-${theme?.colorPallete.accent} border-white border-[1px] rounded-md h-10`} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
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

type SideTypes = {
    dispach:React.Dispatch<ActionTypes>,
    state:AddExerciceReducerType,
}
const Side = ({dispach,state}:SideTypes) => {
    const theme = useContext(ThemeContext)
    const handleChange = (payload:string) => {
        console.log(payload)
        dispach({type:"SIDE",payload:payload as SideType})
    }
    console.log('STATESIDE',state)
    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className={`text-${theme?.colorPallete.accent} font-light text-sm px-2 absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary}`}>Strona</label>
                <select name="side" value={state.side} id="side" className={`bg-${theme?.colorPallete.primary} pl-3 text-${theme?.colorPallete.accent} border-white border-[1px] rounded-md h-10`} onChange={e=>handleChange(e.target.value)}>
                    <option value="Both">Obie</option>
                    <option value="Left">Lewa</option>
                    <option value="Right">Prawa</option>
                </select>
            </div>
        </div>
    )
}