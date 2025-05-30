import { format } from 'date-fns';
import { WeekDayArray, WeekDayArrayPL, MonthNamesArray, MonthNamesArrayVariantPL } from '@/app/lib/utils';
import { useTranslations } from 'next-intl';

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
    },
}
export const SelectedDateInfo = ({dayData,selectedDay,Last30DaysExercises}:SelectedDateInfoTypes) => {
    //we need data here from whole month
    const dayOfMonth = format(selectedDay,'dd')
    const month = format(selectedDay,'L')

    const DayToWeekKGProcentage = Last30DaysExercises?.totalKGThisWeek! > 0 ? Math.round(dayData.KGToday/Last30DaysExercises?.totalKGThisWeek! * 100) : 0 // dont divide by 0
    const DayToWeekSeriesProcentage = Last30DaysExercises?.totalSeriesThisWeek! > 0 ? Math.round(dayData.SeriesToday/Last30DaysExercises?.totalSeriesThisWeek! * 100) : 0 // dont divide by 0

    const averageWeight = Math.abs(Last30DaysExercises?.averageThisMonthDayKG! - dayData.KGToday)
    const averageWeightWord = dayData.KGToday > Last30DaysExercises?.averageThisMonthDayKG! ? true : false
    const averageSeries = Math.abs(Last30DaysExercises?.averageThisMonthSeries! - dayData.SeriesToday)
    const averageSeriesWord = dayData.SeriesToday > Last30DaysExercises?.averageThisMonthSeries! ? true : false

    const t = useTranslations('Home');
    const u = useTranslations("Utils")

  return (
    <div>
        <div className='text-marmur py-1 px-2 text-sm'>
            {u('WeekFullName',{day: format(selectedDay,'i')})} <b>{dayOfMonth}</b> {u('MonthIndex',{index: month})} - {t('ThatDay')}
        </div>
        <div className='bg-marmur grid grid-cols-2 grid-rows-[auto_auto_1fr] gap-x-4 gap-y-2 px-2 py-2 text-sm'>

                <p className=''>{t('Lifted',{number: dayData.KGToday})}</p>
                <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark relative row-start-2 col-start-1'>
                    <div style={{width:`${DayToWeekKGProcentage}%`}} className={`bg-dark text-white flex items-center  relative justify-center font-light rounded-lg h-full`}>
                        {/* <div className={`${DayToWeekKGProcentage === 0 ? 'ml-8' : DayToWeekKGProcentage <= 15? 'absolute -right-[120%]':null}`}>{DayToWeekKGProcentage}%</div> */}
                    </div>
                </div>
                <p className='mt-2 row-start-3 col-start-1'>
                    {t('averageKG',{weight: averageWeight, isMore: averageWeightWord })}
                </p>


                <p className='col-start-2 row-start-1'>{t('Repeated',{number: dayData.SeriesToday})}</p>
                <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark col-start-2 row-start-2'>
                    <div style={{width:`${DayToWeekSeriesProcentage}%`}} className={`bg-dark text-white w-[21%] flex items-center justify-center font-light rounded-lg h-full`}>
                        {/* {DayToWeekSeriesProcentage}% */}
                    </div>
                </div>
                <p className='mt-2 row-start-3 col-start-2'>
                    {t('averageRepeat',{repetition: averageSeries, isMore: averageSeriesWord })}
                </p>

        </div>
    </div>
  )
}
