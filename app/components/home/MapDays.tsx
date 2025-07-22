'use client'
import { dayArrayInitializer, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { format, getDay, isSameDay, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { SelectedDateInfo } from './SelectedDateInfo'
import { ProgessionsDeclinesType, WidgetHomeDaysSum } from '@/app/types'
import { useTranslations } from 'use-intl'
import { Progressions } from './Progressions'
import { Progressions2 } from './Progressions2'

type MapDaysTypes = {
    // Last30DaysExercises?: {
    //     totalKGThisWeek: number;
    //     totalSeriesThisWeek: number;
    //     totalKGThisMonth: number;
    //     totalSeriesThisMonth: number;
    //     averageThisMonthDayKG: number;
    //     averageThisMonthSeries: number;
    //     groupedDays: WidgetHomeDaysSum,
    // }
    data?: {
        [key: string]: ProgessionsDeclinesType[];
    },
    bestExercise?: {
        exercise: ProgessionsDeclinesType[];
        score: number;
    },
    worstExercise?: {
        exercise: ProgessionsDeclinesType[];
        score: number;
    }
}

export const MapDays = ({data,bestExercise,worstExercise}:MapDaysTypes) => {
    const days = dayArrayInitializer()
    const [swtich,setSwtich] = useState(true)
    // const[dayData,setDayData] = useState<{
    //     KGToday: number;
    //     SeriesToday: number;
    // }>({KGToday:0,SeriesToday:0})

    const[selectedDay,setSelectedDay] = useState<Date>(new Date())
    //const enoughData = Object.keys(Last30DaysExercises?.groupedDays || {}).length>=2

    // useEffect(()=> {
    //     getData(new Date())
    // },[])

    // const getData = async (day:Date) => {
    //     let KGSelectedDay = 0
    //     let SeriesSelectedDay = 0

    //     const formattedDate = format(day,'dd,MM')
    //     if(Last30DaysExercises?.groupedDays[formattedDate]){
    //         KGSelectedDay = Last30DaysExercises?.groupedDays[formattedDate].dayWeight
    //         SeriesSelectedDay = Last30DaysExercises?.groupedDays[formattedDate].dayRepeats
    //     }
        
    //     setDayData({KGToday:KGSelectedDay,SeriesToday:SeriesSelectedDay})
    // }

    const u = useTranslations("Utils")

    // const handleChangeSelectedDay = (day:Date) => {
    //     if(!enoughData) return
    //     getData(day)
    //     setSelectedDay(day)
    // }
    
  return (<>
    <div className={`bg-marmur w-screen flex justify-evenly py-2 min-h-16`}>
        {days.map((day,i)=>(
            <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${isSameDay(day,selectedDay)?`bg-dark text-marmur`:null} rounded-full`} 
            //onClick={()=>handleChangeSelectedDay(day)}
            >

                <span className='text-xl font-bold'>{u("WeekFirstLetter",{WeekIndex: i})}</span>
            
                {day.getDate()}
            </div>
        ))}
    </div>
    {/* {enoughData && <SelectedDateInfo dayData={dayData} selectedDay={selectedDay} Last30DaysExercises={Last30DaysExercises}/>} */}
    { swtich ? <Progressions data={data} setSwtich={setSwtich}/> : 
    <Progressions2 setSwtich={setSwtich} bestExercise={bestExercise} worstExercise={worstExercise}/>}
    </>)
}

