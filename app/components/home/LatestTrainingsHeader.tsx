import { useTranslations } from 'next-intl';
import React from 'react'

export const LatestTrainingsHeader = () => {
    const t = useTranslations('Home');
  return (
    <h2 className='text-marmur text-2xl text-center my-6'>{t('LatestTrainings')}</h2>
  )
}
