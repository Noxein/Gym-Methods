'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { WeekDayArrayPL } from '@/app/lib/utils'
import { addDays, getDay, subDays } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'

export const MapDays = () => {
    const theme = useContext(ThemeContext)
    const[days,setDays] = useState<Date[]>([])

    const dayOfWeekIndex = -1 === getDay(new Date()) - 1 ? 6 : getDay(new Date()) - 1  // 0 = monday , 6 = sunday

    useEffect(()=>{
        let newArr:Date[] = []
        const today = new Date()
        for(let i = 0; i <= 6 ; i++){
            if(i===dayOfWeekIndex){
                newArr.push(today)
            }else if(i<dayOfWeekIndex){
                newArr.push(subDays(today,dayOfWeekIndex-i))
            }else if(i>dayOfWeekIndex){
                newArr.push(addDays(today,i-dayOfWeekIndex))
            }else{
            }
        }
        setDays(newArr)
    },[])
  return (
    <div className={`bg-${theme?.colorPallete.accent} w-screen flex justify-evenly py-2 min-h-16`}>
        {days.map((day,i)=>(
            <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${i===dayOfWeekIndex?`bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent}`:null} rounded-full`}>
                <span className='text-xl font-bold'>{WeekDayArrayPL[i].slice(0,1)}</span>
                {day.getDate()}
            </div>
        ))}
    </div>
  )
}

