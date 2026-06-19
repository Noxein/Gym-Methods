'use client'
import React, { useState } from 'react'
import { CenterComponent } from '../CenterComponent';
import { Button } from '../ui/Button';
import { setUserLocale } from '@/app/i18n/locale';
import { Locale } from '@/app/i18n/config'
import { useTranslations } from 'next-intl';
import { FirstSetupFirstStep, FirstSetupSelectedSteps } from '@/app/types';
import { Select } from '../ui/SelectField';
import { getLocale } from 'next-intl/server';

type ChoseLanguageTypes = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
    locale: Locale
}

export const ChoseLanguage = ({setCurrentStep,locale}:ChoseLanguageTypes) => {

    const setLang = async (locale: Locale) => {
        await setUserLocale(locale)
    }

    const t = useTranslations("FirstSetup")

  return (
    <CenterComponent>
        <form className='flex flex-col gap-4 my-5 mx-5 h-full justify-center'>
            <div className='flex-1'>
                <div className='h-full flex flex-col gap-4 justify-end'>
                    <Select 
                        labelName={t("ChooseLanguage")}
                        valuesToLoop={['en','pl']}
                        name='lang'
                        onChange={e=>setLang(e.target.value as Locale)}
                        value={locale}
                    />
                </div>
            </div>
            
            <div className='flex-1 flex items-end'>
                <Button className='text-2xl mt-auto w-full' isPrimary onClick={e=>{e.preventDefault();setCurrentStep('setavatar')}}>{t("Next")}</Button>
            </div>

        </form>
    </CenterComponent>
  )
}
