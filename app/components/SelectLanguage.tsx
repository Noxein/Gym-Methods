import React, { useRef, useState } from 'react'
import { Select } from './ui/SelectField'
import { locales } from '@/i18n'
import { Locale } from '../i18n/config'
import { setUserLocale } from '../i18n/locale'
import { Button } from './ui/Button'
import { useTranslations } from 'next-intl'

export const SelectLanguage = ({setShowSelectLang}:{setShowSelectLang:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const locale = useRef<Locale>('en')
    const handleSave = () => {
      typeof window !== 'undefined' && localStorage.setItem('lang',locale.current)
        setUserLocale(locale.current)
        setShowSelectLang(false)
    }
    const t = useTranslations("Utils")
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='mx-5 w-96 '>
            <Select labelName='Language' valuesToLoop={locales} onChange={e=>locale.current = e.target.value as Locale}/>
            <Button className='w-full mt-4' onClick={handleSave}>{t('Save')}</Button>
        </div>
    </div>
  )
}
