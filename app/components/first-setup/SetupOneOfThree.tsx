'use client'
import { FistStepDataValidation } from '@/app/actions'
import { useState } from 'react'
import { CenterComponent } from '@/app/components/CenterComponent'
import { Button } from '../ui/Button'
import { ErrorDiv } from '../ui/ErrorDiv'
import { useTranslations } from 'next-intl'

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
        somethinWentWrong: string;
        isError: boolean;
    }>({
        goal: '',
        advancmentlevel: '',
        daysexercising: '',
        somethinWentWrong: '',
        isError: false
    })
    const goal = ['Siła','Hipertrofia','Oba']
    const advancmentlevel = ['Początkujący','Średniozaawansowany','Zaawansowany']
    const daysexercising = ['1','2','3','4','5','6','7']

    const ValidateData = async () => {
        const validatedData = FistStepDataValidation(data)

        if(validatedData?.error && validatedData?.error.isError){
            const dataCopy = {...validatedData?.error}
            
            for(let [key,value] of Object.entries(dataCopy)){
                if(typeof value === 'string' && value !== '') (dataCopy as any)[key] = e(value)
            }
            return setError(dataCopy)
        } 
        setCurrentStep(x=>x+1)
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

  return (
    <CenterComponent>
        <form className='flex flex-col gap-4 mb-20 mx-5'>
            <Select 
                labelText={t("GoalQuestion")}
                options={goal}
                name='goal'
                error={error.goal}
                setData={setData}/>
            <Select 
                labelText={t("AdvamcmentLevelQuestion")}
                options={advancmentlevel}
                name='advancmentlevel'
                error={error.advancmentlevel}
                setData={setData}/>
            <Select 
                labelText={t("DaysTrainingQuestion")}
                options={daysexercising}
                name='daysexercising'
                error={error.daysexercising}
                setData={setData}/>
            <ErrorDiv error={error.somethinWentWrong}/>
            <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5 gap-4`}>
                <Button className='flex-1 text-2xl' onClick={()=>setCurrentStep(step=>step-1)}>{t("Back")}</Button>
                <Button className='flex-1 text-2xl' isPrimary onClick={e=>{e.preventDefault();ValidateData()}}>{t("Next")}</Button>
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

    const SL = useTranslations("SelectLoop")

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
                        {SL(option)}
                    </option>
                ))}
            </select>
            <ErrorDiv error={error}/>
        </div>
    )
}