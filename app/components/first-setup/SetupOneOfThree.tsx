import { FistStepDataValidation } from '@/app/actions'
import React, { useState } from 'react'

export type dataType = {
    goal:string,
    advancmentlevel:string,
    daysexercising:string
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
    const daysexercising = ['2','3','4','5']
    const ValidateData = async () => {
        const validatedData = FistStepDataValidation(data)
        if(validatedData?.error) return setError(validatedData.error)
        setCurrentStep(x=>x+1)
    }
  return (
    <form>
        <Select 
            labelText='Jaki cel treningu Cię interesuje'
            options={goal}
            name='goal'
            errors={[]}
            setData={setData}/>
        <Select 
            labelText='Jaki jest Twój poziom zaawansowania' 
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
        <div>
            <button onClick={e=>{e.preventDefault();ValidateData()}}>Dalej</button>
        </div>
    </form>
  )
}


type InputTypes = {
    labelText: string,
    type: string,
    name: string,
    errors: string[]
}

const Input = ({labelText,type,name,errors}:InputTypes) => {
    return(
        <div>
            <label htmlFor={name}>{labelText}</label>
            <input type={type} name={name} id={name} />
            <div>
                {errors.map(e=>(
                    <span key={e}>{e}</span>
                ))}
            </div>
        </div>
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
    const setDataFunc = (value:string) => {
        setData(callbackData=>{
            let callbackDataCopy = {...callbackData}
            callbackDataCopy[name] = value
            return callbackDataCopy
        })
    }
    return(
        <div>
            <label htmlFor={name}>{labelText}</label>
            <select name={name} id={name} defaultValue={options[0]} onChange={e=>setDataFunc(e.target.value)}>
                {options.map((option,index)=>(
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div>
                {errors.map(e=>(
                    <span>{e}</span>
                ))}
            </div>
        </div>
    )
}