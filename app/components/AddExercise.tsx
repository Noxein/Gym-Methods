'use client'
import React, { useEffect, useState } from 'react'
import { Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../actions'
import { usePathname } from 'next/navigation'

export const AddExercise = ({name}:{name:string}) => {
    const[series,setSeries] = useState<Series[]>([])
    const[weight,setWeight] = useState<number>(0)
    const[repeat,setRepeat] = useState<number>(0)
    const[error,setError] = useState<string>('')
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
    <div>
        
        <div className='flex flex-col'>
            <label>Ciężar</label>
            <input type="number" onChange={e=>setWeight(Number(e.target.value))} className='text-black' value={weight}/>

            <label>Powtórzenia</label>
            <input type="number" onChange={e=>setRepeat(Number(e.target.value))} className='text-black' value={repeat}/>

            <button onClick={e=>{e.preventDefault();AddSeries()}}>Dodaj serie</button>
        </div>

        <DisplayCurrentSeries currentSeries={series} setSeries={setSeries}/>

        {error && <div>
            {error}
            </div>}
        <button onClick={FinishTraining} className='bottom-0 fixed mb-20 py-6 text-center w-full'>Zakończ trening</button>
    </div>
    )
}
