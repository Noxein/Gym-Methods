'use client'
import { useState } from 'react'
import { ChoseLanguage } from './ChoseLanguage'
import { FirstSetupFirstStep, UserPurposeType } from '@/app/types'
import Purpose from './Purpose'
import SecondStep from './SecondStep'
import AvatarSelector from './AvatarSelector'
import { Locale } from '@/app/i18n/config'

type FirstSetupProps = {
    jwt?: string,
    locale: Locale
}
export const FirstSetup = ({jwt, locale}: FirstSetupProps) => {
    const[currentStep,setCurrentStep] = useState<FirstSetupFirstStep>('language')

    const[purpose,setPurpose] = useState<UserPurposeType>('Casual')

  return (
    currentStep==='language'?<ChoseLanguage setCurrentStep={setCurrentStep} locale={locale}/>:
    currentStep==='setavatar'?<AvatarSelector setCurrentStep={setCurrentStep}/>:
    currentStep==='purpose'?<Purpose setCurrentStep={setCurrentStep} purpose={purpose} setPurpose={setPurpose}/>:
    <SecondStep purpose={purpose} selectPurpose={setCurrentStep} jwt={jwt} />
    )
}
