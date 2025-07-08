'use client'
import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext<TimerContextType|null>(null)

type TimerContextType = {
    currentSecond: number; 
    setCurrentSecond: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerContextProvider = ({children}:{children: React.ReactNode}) => {
    const [currentSecond,setCurrentSecond] = useState<number>(0)

    useEffect(()=>{
        const name = setTimeout(()=>{setCurrentSecond(currentSecond+1)},1000)
        
        return () => clearTimeout(name)
    },[currentSecond])

    return (
    <TimerContext.Provider value={{
        currentSecond,
        setCurrentSecond,
        }}>
        {children}
    </TimerContext.Provider>
    )
}