import { useTranslations } from 'next-intl';
import React from 'react'

export const ClosestTrainings = () => {
    
    const t = useTranslations('Home');

  return (
    <h2 className='text-center text-2xl text-marmur'>
    {t('ClosestTrainings')}
  </h2>
  )
}
