import React from 'react'
import { getAllTempos } from '../actions'
import { TempoContextProvider } from './LocaleProvider'
import { getLocale } from 'next-intl/server'

export const LocaleDataProvider = async ({children}:{children:React.ReactNode}) => {
    const lang = await getLocale()
  return (
    <TempoContextProvider tempos={lang}>
        {children}
    </TempoContextProvider>
  )
}
 