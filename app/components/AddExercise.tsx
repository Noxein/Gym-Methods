'use client'
import React, { useEffect, useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'

export const AddExercise = () => {
    const[series,setSeries] = useState<Series[]>([])
    const[weight,setWeight] = useState<number>(0)
    const[repeat,setRepeat] = useState<number>(0)

    useEffect(()=>{
        const data = localStorage.getItem('series')
        if(data){
            const parsedData = JSON.parse(data)
            setSeries(parsedData as Series[])
        }
    },[])
    const AddSeries = () => {
        setSeries([...series,{weight,repeat}])
        localStorage.setItem('series',JSON.stringify([...series,{weight,repeat}]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem('series')
    }
  return (
    <FormWrapper
    headerLabel="Dodaj ćwiczenie"
    submitBtnText="Zakończ ćwiczenie"
    buttonFunc={ResetLocalStorage}
    >
        <DisplayCurrentSeries currentSeries={series}/>

        <div className='flex flex-col'>
            <label>Ciężar</label>
            <input type="number" onChange={e=>setWeight(Number(e.target.value))} className='text-black' value={weight}/>
    
            <label>Powtórzenia</label>
            <input type="number" onChange={e=>setRepeat(Number(e.target.value))} className='text-black' value={repeat}/>

            <button onClick={e=>{e.preventDefault();AddSeries()}}>Dodaj serie</button>
        </div>
    </FormWrapper>
  )
}
