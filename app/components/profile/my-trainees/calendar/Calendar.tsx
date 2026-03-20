'use client'
import { Icon } from "@/app/components/Icon";
import { Button } from "@/app/components/ui/Button";
import LocaleContext from "@/app/context/LocaleContext";
import { getOffsetDays, MonthNamesArray, MonthNamesArrayPL, offsetDaysNextMonthArray, offsetDaysPreviousMonthArray, WeekDayArray, WeekDayArrayPL } from "@/app/lib/utils";
import { ExpandIcon2 } from "@/app/ui/icons/ExpandIcon";
import { addMonths, format, getDaysInMonth, isSameDay, subMonths } from "date-fns";
import { useContext, useState } from "react";

type CalendarProps = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}
function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
    const daysInMonth = getDaysInMonth(selectedDate);
    const offsetStart = getOffsetDays(selectedDate);

    const localeContext = useContext(LocaleContext);

    const arrayOfWeekDays = localeContext === 'pl' ? WeekDayArrayPL : WeekDayArray;
    const currentMonth = localeContext === 'pl' ? MonthNamesArrayPL[MonthNamesArray.indexOf(format(selectedDate, 'MMMM'))] : format(selectedDate, 'MMMM');
    
    const nextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    }

    const prevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    }

    const year = format(selectedDate, 'yyyy');

    const offsetArrPrevMonth = offsetDaysPreviousMonthArray(selectedDate);
    const offsetArrNextMonth = offsetDaysNextMonthArray(selectedDate);

    const handleClickDayFromNextOrPrevMonth = (date: Date) => {
        setSelectedDate(date);
    }
    return ( 
    <div className="bg-darkLight mx-5 mt-5 rounded-lg p-4 flex flex-col items-center justify-center">
        <div className="flex items-center w-full">
            <Icon className="rotate-90" onClick={prevMonth}>
                <ExpandIcon2 expanded/>
            </Icon>

            <p className="text-white flex-1 text-center">{currentMonth} {year}</p>

            <Icon className="-rotate-90" onClick={nextMonth}>
                <ExpandIcon2 expanded/>
            </Icon>
        </div>
       

        <div className="grid grid-cols-7 gap-2 mt-4 w-full">
            {arrayOfWeekDays.map((day, index) => (
                <div key={index} className="text-gray-400 flex items-center justify-center h-12">{day.trim().substring(0,3)}</div>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-4 w-full">
            {offsetArrPrevMonth.map((date, index) => (
                <div key={`empty-${index}`} className="text-gray-500 flex items-center justify-center h-12 font-mono" onClick={() => handleClickDayFromNextOrPrevMonth(date)}>{format(date, 'dd')}</div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
                <div key={i} className={`text-white flex items-center justify-center h-12 font-mono ${isSameDay(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1), selectedDate) ? 'bg-blue-500 rounded-full' : ''}`} onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1))}>
                    {i + 1}
                </div>
            ))}
            {offsetArrNextMonth.map((date, index) => (
                <div key={`empty-next-${index}`} className="text-gray-500 flex items-center justify-center h-12 font-mono" onClick={() => handleClickDayFromNextOrPrevMonth(date)}>{format(date, 'dd')}</div>
            ))}
        </div>
    </div>
    );
}

export default Calendar;