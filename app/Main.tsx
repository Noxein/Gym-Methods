'use client'
import React, { useEffect, useState } from 'react'
import { SelectLanguage } from './components/SelectLanguage'
import { getLang } from './lib/utils'

export const Main = ({children}:{children:React.ReactNode}) => {
    const[showSelectLang,setShowSelectLang] = useState(false)
    
    useEffect(()=>{
      const lang = typeof window !== 'undefined' && window.localStorage.getItem('lang')
      const showSelectLang = lang

      if(!showSelectLang){     
        setShowSelectLang(true)
        return
      }else{
        getLang()
      }
      
    },[])
  return (
    <div>
        {showSelectLang ? <SelectLanguage setShowSelectLang={setShowSelectLang}/> : children }
    </div>
  )
}
