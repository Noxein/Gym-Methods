'use client'
import React, { useEffect } from 'react'
import { SelectLanguage } from './components/SelectLanguage'
import { getLang } from './lib/utils'

export const Main = ({children}:{children:React.ReactNode}) => {
    const lang = localStorage.getItem('lang')
    const showSelectLang = lang

    useEffect(()=>{
      if(showSelectLang){
        getLang()
      }
    },[])
  return (
    <div>
        {showSelectLang ? children : <SelectLanguage /> }
        {/* {children} */}
    </div>
  )
}
