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
        <form className='flex flex-col gap-4 mb-20 mx-5'>
            <Select 
                labelName={t("ChooseLanguage")}
                valuesToLoop={['en','pl']}
                name='lang'
                onChange={e=>setLang(e.target.value as Locale)}
                value={locale}
            />

            <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5`}>
                <Button className='flex-1 text-2xl' isPrimary onClick={e=>{e.preventDefault();setCurrentStep('setavatar')}}>{t("Next")}</Button>
            </div>
        </form>
    </CenterComponent>
  )
}
