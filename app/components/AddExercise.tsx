'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../actions'
import { usePathname } from 'next/navigation'
import { ThemeContext } from '../context/ThemeContext'

export const AddExercise = ({name}:{name:string}) => {
    const[series,setSeries] = useState<Series[]>([])
    const[weight,setWeight] = useState<number>(0)
    const[repeat,setRepeat] = useState<number>(0)
    const[error,setError] = useState<string>('')
    //todo make difficulty level picker
    const theme = useContext(ThemeContext)

    const[difficultyLevel,setDifficultyLevel] = useState<string>('easy')
    const pathname = usePathname()

    useEffect(()=>{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            setSeries(parsedData as Series[])
        }
    },[])
    const AddSeries = () => {
        setSeries([...series,{weight,repeat}])
        localStorage.setItem(name,JSON.stringify([...series,{weight,repeat}]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem(name)
    }
    const FinishTraining = async () => {
        ResetLocalStorage()

        const possibleError = await AddExerciseAction(name,series,difficultyLevel,pathname.includes('training'))
        if(possibleError) {
            setError(possibleError.errors)
        }
    }
  return (
    <div className='px-4 pt-4'>
        <h1 className={`text-[${theme?.colorPallete.accent}] text-xl text-center border-b-2 border-b-[${theme?.colorPallete.secondary}] pb-2`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 bg-[${theme?.colorPallete.primary}] pt-2`}>
            <Label htmlFor='weight'>Ciężar</Label>
            <Input type="number" id='weight' onChange={e=>setWeight(Number(e.target.value))} value={weight} min={1}/>

            <Label htmlFor='repeat'>Powtórzenia</Label>
            <Input type="number" id='repeat' onChange={e=>setRepeat(Number(e.target.value))} value={repeat} min={1}/>

            <button onClick={e=>{e.preventDefault();AddSeries()}} className={`mt-6 text-xl border-white bg-[${theme?.colorPallete.secondary}] text-white border-2 rounded-md py-2`}>Dodaj serie</button>
        </div>

        <DisplayCurrentSeries seriesname={name} currentSeries={series} setSeries={setSeries}/>

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
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-xl text-[${theme?.colorPallete.accent}]`} {...rest}></label>
    )
}