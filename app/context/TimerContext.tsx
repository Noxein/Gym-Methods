'use client'
import { differenceInSeconds } from "date-fns";
import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext<TimerContextType|null>(null)

type TimerContextType = {
    timePassed: number; 
    setTimePassed: React.Dispatch<React.SetStateAction<number>>;
    setFirstDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const TimerContextProvider = ({children}:{children: React.ReactNode}) => {
    const[timePassed,setTimePassed] = useState<number>(0)
    const[firstDate,setFirstDate] = useState<Date>(new Date())

    useEffect(()=>{
        const name = setTimeout(()=>{
            const newsec = differenceInSeconds(new Date(),firstDate)
            setTimePassed(newsec)},
            1000)
        
        return () => clearTimeout(name)
    },[timePassed,firstDate])

    return (
    <TimerContext.Provider value={{
        timePassed,
        setTimePassed,
        setFirstDate
        }}>
        {children}
    </TimerContext.Provider>
    )
}