'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export const H2 = () => {

    const t = useTranslations("Home/Start-Training")
    
  return (
<h2 className='text-center text-xl mb-2'>{t("LatestTrainings")}</h2>
  )
}
