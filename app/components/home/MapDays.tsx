'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { dayArrayInitializer, WeekDayArrayPL } from '@/app/lib/utils'
import { format, getDay, isSameDay, subDays } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { SelectedDateInfo } from './SelectedDateInfo'
import { WidgetHomeDaysSum } from '@/app/types'

type MapDaysTypes = {
    Last30DaysExercises?: {
        totalKGThisWeek: number;
        totalSeriesThisWeek: number;
        totalKGThisMonth: number;
        totalSeriesThisMonth: number;
        averageThisMonthDayKG: number;
        averageThisMonthSeries: number;
        groupedDays: WidgetHomeDaysSum,
    }
}

export const MapDays = ({Last30DaysExercises}:MapDaysTypes) => {
    const theme = useContext(ThemeContext)
    const days = dayArrayInitializer()
    const[dayData,setDayData] = useState<{
        KGToday: number;
        SeriesToday: number;
    }>({KGToday:0,SeriesToday:0})
    const[selectedDay,setSelectedDay] = useState<Date>(new Date())
    const enoughData = Object.keys(Last30DaysExercises?.groupedDays || {}).length>=2

    const getData = async (day:Date) => {
        //const data = await SelectedDayExercisesForWidget(day?day:new Date())
        let KGSelectedDay = 0
        let SeriesSelectedDay = 0

        const formattedDate = format(day,'dd,MM')
        if(Last30DaysExercises?.groupedDays[formattedDate]){
            KGSelectedDay = Last30DaysExercises?.groupedDays[formattedDate].dayWeight
            SeriesSelectedDay = Last30DaysExercises?.groupedDays[formattedDate].dayRepeats
        }
        
        setDayData({KGToday:KGSelectedDay,SeriesToday:SeriesSelectedDay})
    }

    useEffect(()=>{
        getData(new Date())
    },[])

    const dayOfWeekIndex = -1 === getDay(new Date()) - 1 ? 6 : getDay(new Date()) - 1  // 0 = monday , 6 = sunday
    const handleChangeSelectedDay = (day:Date) => {
        if(!enoughData) return
        getData(day)
        setSelectedDay(day)
        console.log(day)
    }
    
  return (<>
    <div className={`bg-${theme?.colorPallete.accent} w-screen flex justify-evenly py-2 min-h-16`}>
        {days.map((day,i)=>(
            <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${isSameDay(day,selectedDay)?`bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent}`:null} rounded-full`} onClick={()=>handleChangeSelectedDay(day)}>
                <span className='text-xl font-bold'>{WeekDayArrayPL[i].slice(0,1)}</span>
                {day.getDate()}
            </div>
        ))}
    </div>
    {enoughData && <SelectedDateInfo dayData={dayData} selectedDay={selectedDay} Last30DaysExercises={Last30DaysExercises}/>}
    </>)
}

