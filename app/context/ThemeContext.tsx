'use client'
import { createContext, useState } from "react"
import { ThemeContextTypes } from "../types"

export const ThemeContext = createContext<ThemeContextTypes|null>(null)

export const ThemeContextProvider = ({children}:{children:React.ReactNode}) => {
    const[theme,setTheme] = useState<'dark'|'light'>('dark')

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}