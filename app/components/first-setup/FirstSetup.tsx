'use client'
import { useState } from 'react'
import { ChoseLanguage } from './ChoseLanguage'
import { FirstSetupFirstStep, UserPurposeType } from '@/app/types'
import Purpose from './Purpose'
import SecondStep from './SecondStep'

type FirstSetupProps = {
    jwt?: string
}
export const FirstSetup = ({jwt}: FirstSetupProps) => {
    const[currentStep,setCurrentStep] = useState<FirstSetupFirstStep>('language')

    const[purpose,setPurpose] = useState<UserPurposeType>('Casual')

  return (
    currentStep==='language'?<ChoseLanguage setCurrentStep={setCurrentStep}/>:
    currentStep==='purpose'?<Purpose setCurrentStep={setCurrentStep} purpose={purpose} setPurpose={setPurpose}/>:
    <SecondStep purpose={purpose} selectPurpose={setCurrentStep} jwt={jwt} />
    )
}
