'use client'
import React, { useEffect, useState } from 'react'
import { FormWrapper } from './FormWrapper'
import { Series } from '../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { useRouter } from 'next/navigation'

export const AddExercise = ({name}:{name:string}) => {
    const[series,setSeries] = useState<Series[]>([])
    const[weight,setWeight] = useState<number>(0)
    const[repeat,setRepeat] = useState<number>(0)
    const router = useRouter()
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
        router.push('/home/add-exercise')
    }
  return (
    <FormWrapper
    headerLabel={name}
    submitBtnText="Zakończ ćwiczenie"
    buttonFunc={ResetLocalStorage}
    >
        <DisplayCurrentSeries currentSeries={series} setSeries={setSeries}/>

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
