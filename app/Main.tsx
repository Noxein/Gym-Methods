'use client'
import React from 'react'
import { SelectLanguage } from './components/SelectLanguage'

export const Main = ({children}:{children:React.ReactNode}) => {
    const lang = localStorage.getItem('lang')
    const showSelectLang = lang
  return (
    <div>
        {showSelectLang ? children : <SelectLanguage /> }
        {/* {children} */}
    </div>
  )
}
