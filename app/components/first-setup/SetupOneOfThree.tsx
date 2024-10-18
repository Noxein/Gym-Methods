'use client'
import { FistStepDataValidation } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useState } from 'react'
import { CenterComponent } from '@/app/components/CenterComponent'

export type dataType = {
    goal:string,
    advancmentlevel:string,
    daysexercising:string,
}
type SetupOneOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    data:dataType,
    setData: React.Dispatch<React.SetStateAction<dataType>>
}

export const SetupOneOfThree = ({setCurrentStep,data,setData}:SetupOneOfThree) => {
    const[error,setError] = useState('')
    const goal = ['Siła','Hipertrofia','Oba']
    const advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']
    const daysexercising = ['1','2','3','4','5','6','7']
    const theme = useContext(ThemeContext)

    const ValidateData = async () => {
        const validatedData = FistStepDataValidation(data)
        if(validatedData?.error) return setError(validatedData.error)
        setCurrentStep(x=>x+1)
    }
  return (
    <CenterComponent>
        <form className='flex flex-col gap-4 mb-20 mx-5'>
            <Select 
                labelText='Jaki cel treningu Cię interesuje?'
                options={goal}
                name='goal'
                errors={[]}
                setData={setData}/>
            <Select 
                labelText='Jaki jest Twój poziom zaawansowania?' 
                options={advancmentlevel}
                name='advancmentlevel'
                errors={[]}
                setData={setData}/>
            <Select 
                labelText='Ile dni w tygodniu chcesz ćwiczyć?'
                options={daysexercising}
                name='daysexercising'
                errors={[]}
                setData={setData}/>
            <div className='text-red-500'>{error}</div>
            <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5 bg-${theme?.colorPallete.primary}`}>
                <button onClick={e=>{e.preventDefault();ValidateData()}} className='flex-1 text-white bg-green py-3 rounded-lg font-semibold text-2xl'>Dalej</button>
            </div>
        </form>
    </CenterComponent>
  )
}

type SelectTypes = {
    labelText: string,
    options: string[],
    name:'goal'|'advancmentlevel'|'daysexercising',
    errors: string[],
    setData: React.Dispatch<React.SetStateAction<dataType>>
}
const Select = ({labelText, options, name, errors, setData}:SelectTypes) => {
    const theme = useContext(ThemeContext)
    const setDataFunc = (value:string) => {
        setData(callbackData=>{
            let callbackDataCopy = {...callbackData}
            callbackDataCopy[name] = value
            return callbackDataCopy
        })
    }
    return(
        <div className='flex flex-col text-white gap-1'>
            <label htmlFor={name} className='text-xl'>{labelText}</label>
            <select name={name} id={name} defaultValue={options[0]} onChange={e=>setDataFunc(e.target.value)}
                className={`rounded-lg px-2 py-2 bg-${theme?.colorPallete.primary} border-${theme?.colorPallete.accent} border-1 text-xl`}
                >
                {options.map((option,index)=>(
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>
                {errors.map(e=>(
                    <span key={e}>{e}</span>
                ))}
            </div>
        </div>
    )
}