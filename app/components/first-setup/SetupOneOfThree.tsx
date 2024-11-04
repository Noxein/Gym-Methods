'use client'
import { FistStepDataValidation } from '@/app/actions'
import { useState } from 'react'
import { CenterComponent } from '@/app/components/CenterComponent'
import { Button } from '../ui/Button'
import { ErrorDiv } from '../ui/ErrorDiv'

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
    const[error,setError] = useState<{
        goal: string;
        advancmentlevel: string;
        daysexercising: string;
        isError: boolean;
    }>({
        goal: '',
        advancmentlevel: '',
        daysexercising: '',
        isError: false
    })
    const goal = ['Siła','Hipertrofia','Oba']
    const advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']
    const daysexercising = ['1','2','3','4','5','6','7']

    const ValidateData = async () => {
        const validatedData = FistStepDataValidation(data)
        if(validatedData?.error && validatedData?.error.isError) return setError(validatedData.error)
        setCurrentStep(x=>x+1)
    }
  return (
    <CenterComponent>
        <form className='flex flex-col gap-4 mb-20 mx-5'>
            <Select 
                labelText='Jaki cel treningu Cię interesuje?'
                options={goal}
                name='goal'
                error={error.goal}
                setData={setData}/>
            <Select 
                labelText='Jaki jest Twój poziom zaawansowania?' 
                options={advancmentlevel}
                name='advancmentlevel'
                error={error.advancmentlevel}
                setData={setData}/>
            <Select 
                labelText='Ile dni w tygodniu chcesz ćwiczyć?'
                options={daysexercising}
                name='daysexercising'
                error={error.daysexercising}
                setData={setData}/>
            <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5`}>
                <Button className='flex-1 text-2xl' isPrimary onClick={e=>{e.preventDefault();ValidateData()}}>Dalej</Button>
            </div>
        </form>
    </CenterComponent>
  )
}

type SelectTypes = {
    labelText: string,
    options: string[],
    name:'goal'|'advancmentlevel'|'daysexercising',
    error: string,
    setData: React.Dispatch<React.SetStateAction<dataType>>
}
const Select = ({labelText, options, name, error, setData}:SelectTypes) => {
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
                className={`rounded-lg px-2 py-2 bg-dark border-marmur border-1 text-xl`}
                >
                {options.map((option,index)=>(
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <ErrorDiv error={error}/>
        </div>
    )
}