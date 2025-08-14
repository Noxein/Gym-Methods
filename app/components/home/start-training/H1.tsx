'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export const H1 = () => {
    
    const t = useTranslations("Home/Start-Training")

  return (
    <h1 className='text-2xl text-center mt-10'>{t("ContinueTraining")}</h1>
  )
}
