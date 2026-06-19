'use client'
import { FistStepDataValidation } from '@/app/actions'
import { useState } from 'react'
import { CenterComponent } from '@/app/components/CenterComponent'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { FirstSetupFirstStep, FirstSetupSelectedSteps } from '@/app/types'
import { Select as SelectUI } from '../../ui/SelectField'
import Navigator from '../Navigator'

export type dataType = {
    goal:string,
    advancmentlevel:string,
    daysexercising:string,
}
type SetupOneOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupSelectedSteps>>,
    data:dataType,
    setData: React.Dispatch<React.SetStateAction<dataType>>,
    selectPurpose: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
}

export const Goal = ({setCurrentStep,data,setData,selectPurpose}:SetupOneOfThree) => {
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
        const validatedData = await FistStepDataValidation(data)

        if(validatedData?.error && validatedData?.error.isError){
            const dataCopy = {...validatedData?.error}
            
            for(let [key,value] of Object.entries(dataCopy)){
                if(typeof value === 'string' && value !== '') (dataCopy as any)[key] = e(value)
            }
            return setError(dataCopy)
        } 
        setCurrentStep('training-creator')
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

  return (
    <CenterComponent>
        <form className='flex flex-col gap-4 mb-20 mx-5 flex-1 justify-center'>
            <Select 
                labelText={t("Goal")}
                options={goal}
                name='goal'
                error={error.goal}
                setData={setData}/>
            <Select 
                labelText={t("AdvamcmentLevel")}
                options={advancmentlevel}
                name='advancmentlevel'
                error={error.advancmentlevel}
                setData={setData}/>
            <Select 
                labelText={t("DaysTrainingPerWeek")}
                options={daysexercising}
                name='daysexercising'
                error={error.daysexercising}
                setData={setData}/>
            <ErrorDiv error={error.somethinWentWrong}/>
            

        </form>
            <Navigator 
                prev={()=>selectPurpose('purpose')}
                next={e=>{e.preventDefault();ValidateData()}}
            />
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
        <div className='flex flex-col text-white gap-1 mb-2'>            
            <SelectUI labelName={labelText} valuesToLoop={options} onChange={e=>setDataFunc(e.target.value)}/>

            <ErrorDiv error={error}/>
        </div>
    )
}