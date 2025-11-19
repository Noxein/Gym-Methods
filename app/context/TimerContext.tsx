'use client'
import { differenceInSeconds } from "date-fns";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext<TimerContextType|null>(null)

type TimerContextType = {
    timePassed: number; 
    setTimePassed: React.Dispatch<React.SetStateAction<number>>;
    newDateSetter: (date:Date,exerciseName: string) => void;
}



export const TimerContextProvider = ({children}:{children: React.ReactNode}) => {
    const params = useParams()
    const name = decodeURI(params.exercisename as string)

    const getExerciseTime = () => {
        const time = localStorage.getItem(name+'date')

        if(!time){
            const date = new Date()
            localStorage.setItem(name+'date',JSON.stringify(date))
            return date
        }

        const date = new Date(JSON.parse(time))
        return date
    }


    
    const[firstDate,setFirstDate] = useState<Date>(getExerciseTime)

    const initalSecondsPassed = () => {
        return differenceInSeconds(new Date(),firstDate)
    }

    const[timePassed,setTimePassed] = useState<number>(initalSecondsPassed)



    useEffect(()=>{
        const name = setTimeout(()=>{
            const newsec = differenceInSeconds(new Date(),firstDate)
            setTimePassed(newsec)},
            1000)
        
        return () => clearTimeout(name)
    },[timePassed,firstDate])

    const newDateSetter = (date:Date,exerciseName:string) => {
        localStorage.setItem(exerciseName+'date',JSON.stringify(date))
        setFirstDate(date)
    }

    return (
    <TimerContext.Provider value={{
        timePassed,
        setTimePassed,
        newDateSetter
        }}>
        {children}
    </TimerContext.Provider>
    )
}