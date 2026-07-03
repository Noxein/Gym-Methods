'use client'
import { TraineePlan } from "@/app/types";
import { addDays, format, isSameDay } from "date-fns";
import { useState } from "react";
import TodaysTraining from "./TodaysTraining";
import { useTranslations } from "next-intl";

type NextTrainingProps = {
    plan: TraineePlan,
}

function NextTraining({ plan }: NextTrainingProps) {
    const t = useTranslations("Home/TraineeHome")

    const today = new Date()
    const[selectedDay, setSelectedDay] = useState<Date>(new Date())

    const todaysTrainingIndex = plan.plan.findIndex(day => !day.iscompleted && isSameDay(new Date(day.date), today))
    const todaysTraining = todaysTrainingIndex === -1 ? null : plan.plan[todaysTrainingIndex]

    const minTime2 = plan.plan.find(day => isSameDay(new Date(day.date), selectedDay))?.exercises.reduce((min, exercise) =>{
        return min + exercise.sets.length * 180
    },0) || 0

    const timeInHoursWithPartial = Math.floor(minTime2 / 3600) + (minTime2 % 3600) / 3600
    
    const selectedDayPlan = plan.plan.find(day => isSameDay(new Date(day.date), selectedDay))
    const isSelectedDayToday = isSameDay(selectedDay, today)
    return ( 
        <div>
            {/* <div className="text-gray-200">Dzisiaj nie masz treningu, ale masz zaplanowane treningi na kolejne dni.</div>  */}

            <div className="flex justify-between w-full mb-4">
                {[...Array(7).keys()].map((_,index)=>{
                    const currentMapDate = addDays(new Date(today), index)
                    const isSeleted = isSameDay(addDays(new Date(today), index), selectedDay)
                    const isATrainingDay = plan.plan.some(x => isSameDay(new Date(x.date), currentMapDate))

                    const handleClick = () => setSelectedDay(addDays(new Date(today), index))

                    return <div className={`p-2 flex items-center justify-center font-mono text-center border-1 rounded-full w-12 h-12 ${isSeleted ? "border-white text-white border-2" : isATrainingDay ? "border-green text-green border-2" :" border-gray-400 text-gray-400"} `} key={index} onClick={handleClick}>
                        {format(addDays(new Date(today), index), "dd")}
                    </div>
                })}
            </div>
            {isSelectedDayToday && todaysTraining ? <TodaysTraining training={plan} currentDay={todaysTrainingIndex} planLength={plan.plan.length}/> :
            <div className="mt-5 text-gray-200">
                {t("OnDate", {date: format(selectedDay, "dd/MM/yyyy")})}
                {selectedDayPlan ?
                <div>
                    {t("YouHaveTraining", {name: selectedDayPlan?.name, current: plan.plan.indexOf(selectedDayPlan) + 1, total: plan.plan.length})}
                </div>
                
                : 
                <div>{t("NoTrainingScheduled")}</div>
                }
                {selectedDayPlan && <p className="text-gray-400">{t("TimeRange", {start: timeInHoursWithPartial, end: timeInHoursWithPartial + 0.5})}</p>}
            </div>}
        </div>
        );
}

export default NextTraining;
