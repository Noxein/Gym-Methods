'use client'
import { createContext, useEffect, useState } from "react"
import { ColorPalleteType, ThemeContextTypes } from "../types"
import { ClassMaker } from "../ui/icons/ClassMaker"

export const ThemeContext = createContext<ThemeContextTypes|null>(null)

export const ThemeContextProvider = ({children}:{children:React.ReactNode}) => {
    const darkPalette = {
        primary: 'dark',
        secondary: '#576CA8',
        accent: 'marmur',
    }
    const ligtPalette = {
        primary: '#E7E7E7',
        secondary: '#576CA8',
        accent: 'marmur',
    }
    const[theme,setTheme] = useState<'dark'|'light'>('light')
    const[colorPallete,setColorPalette] = useState<ColorPalleteType>(darkPalette)

    
    useEffect(()=>{
        const theme = localStorage.getItem('theme')
        if(theme){
            const themeParsed = JSON.parse(theme) as string
            if(themeParsed==='dark'){
                setColorPalette(darkPalette)
            }else{
                setColorPalette(ligtPalette)
            }
            
        }
    },[])

    return(
        <ThemeContext.Provider value={{theme, setTheme, colorPallete}}>
            {children}
            <ClassMaker />
        </ThemeContext.Provider>
    )
}