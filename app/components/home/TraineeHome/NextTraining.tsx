'use client'
import { TraineePlan } from "@/app/types";
import { addDays, format, isSameDay } from "date-fns";
import { useState } from "react";
import TodaysTraining from "./TodaysTraining";

type NextTrainingProps = {
    plan: TraineePlan,
    currentDay: number
}

function NextTraining({ plan, currentDay }: NextTrainingProps) {

    const today = new Date()
    const nextTrainingDate = new Date(plan.plan[currentDay].date)

    const[selectedDay, setSelectedDay] = useState<Date>(new Date())

    const minTime2 = plan.plan.find(day => isSameDay(new Date(day.date), selectedDay))?.exercises.reduce((min, exercise) =>{
        return min + exercise.sets.length * 180
    },0) || 0

    const timeInHoursWithPartial = Math.floor(minTime2 / 3600) + (minTime2 % 3600) / 3600
    
    return ( 
        <div>
            <div className="text-gray-200">Dzisiaj nie masz treningu, ale masz zaplanowane treningi na kolejne dni.</div> 

            <div className="flex justify-between w-full mt-5">
                {[...Array(7).keys()].map((_,index)=>{
                    const isSeleted = isSameDay(addDays(new Date(today), index), selectedDay)
                    const isNextTraining = isSameDay(addDays(new Date(today), index), nextTrainingDate)

                    const handleClick = () => setSelectedDay(addDays(new Date(today), index))

                    return <div className={`p-2 flex items-center justify-center font-mono text-center border-1 rounded-full w-12 h-12 ${isSeleted ? "border-white text-white border-2" : isNextTraining ? "border-green text-green border-2" :" border-gray-400 text-gray-400"} `} key={index} onClick={handleClick}>
                        {format(addDays(new Date(today), index), "dd")}
                    </div>
                })}
            </div>
            <div className="mt-5 text-gray-200">
                Dnia {format(selectedDay, "dd/MM/yyyy")}
                {isSameDay(selectedDay, nextTrainingDate) ?
                <div>
                    Masz trening {plan.plan[currentDay].name} - Dzień {plan.plan.findIndex(day => isSameDay(new Date(day.date), selectedDay))+1} / {plan.plan.length}
                </div>
                
                : 
                <div>nie masz zaplanowanego treningu</div>
                }
                {plan.plan.some(x => isSameDay(new Date(x.date), selectedDay)) && <p className="text-gray-400">Czas {timeInHoursWithPartial}h - {timeInHoursWithPartial+0.5}h</p>}
            </div>
        </div>
        );
}

export default NextTraining;