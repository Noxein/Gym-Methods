import React from 'react'
import { getAllTempos } from '../actions'
import { TempoContextProvider } from './TempoContext'

export const TempoContextDataProvider = async ({children}:{children:React.ReactNode}) => {
    const data = await getAllTempos()
  return (
    <TempoContextProvider tempos={data}>
        {children}
    </TempoContextProvider>
  )
}
 