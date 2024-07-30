'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const BodyColorProvider = () => {
    const theme = useContext(ThemeContext)
  return (
    <div className={`-z-10 bg-[${theme?.colorPallete.primary}] fixed top-0 left-0 w-screen h-screen`}>
        
    </div>
  )
}
