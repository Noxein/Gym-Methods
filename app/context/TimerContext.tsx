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
        const nowDate = new Date()

        if(!time){
            localStorage.setItem(name+'date',JSON.stringify(nowDate))
            return nowDate
        }

        const exerciseDate = new Date(JSON.parse(time))
        if(differenceInSeconds(new Date(),exerciseDate) > 3600) return nowDate
        return exerciseDate
    }


    
    const[firstDate,setFirstDate] = useState<Date>(getExerciseTime)

    const initalSecondsPassed = () => {
        return differenceInSeconds(new Date(),firstDate)
    }

    const[timePassed,setTimePassed] = useState<number>(initalSecondsPassed)



    useEffect(()=>{
        const name = setTimeout(()=>{
            const newsec = differenceInSeconds(new Date(),firstDate)
            console.log(newsec,firstDate)
            setTimePassed(newsec)},
            1000)
        
        return () => clearTimeout(name)
    },[timePassed,firstDate])

    const newDateSetter = (date:Date,exerciseName:string) => {
        localStorage.setItem(exerciseName+'date',JSON.stringify(date))
        setFirstDate(new Date(date))
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