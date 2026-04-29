'use client'
import { TraineePlan } from "@/app/types";
import { addDays, format, isSameDay, subDays } from "date-fns";
import { useState } from "react";
import TodaysTraining from "./TodaysTraining";

type NextTrainingProps = {
    plan: TraineePlan,
}

function NextTraining({ plan }: NextTrainingProps) {

    const today = new Date()

    const[selectedDay, setSelectedDay] = useState<Date>(new Date())

    const minTime2 = plan.plan.find(day => isSameDay(new Date(day.date), selectedDay))?.exercises.reduce((min, exercise) =>{
        return min + exercise.sets.length * 180
    },0) || 0

    const timeInHoursWithPartial = Math.floor(minTime2 / 3600) + (minTime2 % 3600) / 3600
    
    const selectedDayPlan = plan.plan.find(day => isSameDay(new Date(day.date), selectedDay))

    const todaysTraining = plan.plan.find(x => isSameDay(new Date(x.date), new Date()))
    const isSelectedDayToday = isSameDay(selectedDay, new Date())
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
            {isSelectedDayToday && todaysTraining ? <TodaysTraining training={plan} currentDay={plan.plan.findIndex(x=>x.iscompleted===false)!} planLength={plan.plan.length}/> :
            <div className="mt-5 text-gray-200">
                Dnia {format(selectedDay, "dd/MM/yyyy")}
                {selectedDayPlan ?
                <div>
                    Masz trening {selectedDayPlan?.name} - Dzień {plan.plan.indexOf(selectedDayPlan)+1} / {plan.plan.length}
                </div>
                
                : 
                <div>nie masz zaplanowanego treningu</div>
                }
                {selectedDayPlan && <p className="text-gray-400">Czas {timeInHoursWithPartial}h - {timeInHoursWithPartial+0.5}h</p>}
            </div>}
        </div>
        );
}

export default NextTraining;