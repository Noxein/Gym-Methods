import { format } from 'date-fns';
import React from 'react'
import { WeekDayArray, WeekDayArrayPL, MonthNamesArray, MonthNamesArrayVariantPL } from '@/app/lib/utils';

type SelectedDateInfoTypes = {
    dayData: {
        KGToday: number;
        SeriesToday: number;
    },
    selectedDay: Date,
    Last30DaysExercises?: {
        totalKGThisWeek: number;
        totalSeriesThisWeek: number;
        totalKGThisMonth: number;
        totalSeriesThisMonth: number;
        averageThisMonthDayKG: number;
        averageThisMonthSeries: number;
    }
}
export const SelectedDateInfo = ({dayData,selectedDay,Last30DaysExercises}:SelectedDateInfoTypes) => {
    //we need data here from whole month
    const weekDay = WeekDayArrayPL[WeekDayArray.indexOf(format(selectedDay,'EEEE'))]
    const dayOfMonth = format(selectedDay,'dd')
    const month = MonthNamesArrayVariantPL[MonthNamesArray.indexOf(format(selectedDay,'LLLL'))]
    const DayToWeekKGProcentage = Math.round(dayData.KGToday/Last30DaysExercises?.totalKGThisWeek! * 100)
    const DayToWeekSeriesProcentage = Math.round(dayData.SeriesToday/Last30DaysExercises?.totalSeriesThisWeek! * 100)

    const averageWeight = Math.abs(Last30DaysExercises?.averageThisMonthDayKG! - dayData.KGToday)
    const averageWeightWord = dayData.KGToday > Last30DaysExercises?.averageThisMonthDayKG! ? 'więcej' : 'mniej'
    const averageSeries = Math.abs(Last30DaysExercises?.averageThisMonthSeries! - dayData.SeriesToday)
    const averageSeriesWord = dayData.SeriesToday > Last30DaysExercises?.averageThisMonthSeries! ? 'więcej' : 'mniej'

    const odmianaKilogram1 = dayData.KGToday >= 5 ? 'kilogramów' : dayData.KGToday >= 2 ? 'kilogramy' : dayData.KGToday === 1 ? 'kilogram' : 'kilogramów'
    const odmianaSerii1 = dayData.SeriesToday 
  return (
    <div>
        <div className='text-marmur py-1 px-5 text-sm'>
            {weekDay} <b>{dayOfMonth}</b> {month} - Tego dnia
        </div>
        <div className='bg-marmur flex gap-4 px-5 py-2 text-sm'>
            <div className='flex-1'>
                <p>Przerzuciłeś <b>{dayData.KGToday}</b> KG</p>
                <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark'>
                    <div style={{width:`${DayToWeekKGProcentage}%`}} className='bg-dark text-white flex items-center justify-center font-light rounded-lg h-full'>{DayToWeekKGProcentage}%</div>
                </div>
                <p className='mt-2'>
                    To o { averageWeight } KG { averageWeightWord } niż typowy dzień z 30 dni temu
                </p>
            </div>

            <div className='flex-1'>
                <p>Wykonałeś <b>{dayData.SeriesToday}</b> serie</p>
                <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark'>
                    <div style={{width:`${DayToWeekSeriesProcentage}%`}} className='bg-dark text-white w-[21%] flex items-center justify-center font-light rounded-lg h-full'>{DayToWeekSeriesProcentage}%</div>
                </div>
                <p className='mt-2'>
                    To o { averageSeries } serii { averageSeriesWord } niż typowy dzień z 30 dni temu
                </p>
            </div>
        </div>
    </div>
  )
}
