'use client'
import { TraineePlan } from "@/app/types";
import SubTrainings from "./SubTrainings";
import { addDays, format, isSameDay } from "date-fns";
import { useState } from "react";

type TraineeTrainingsProps = {
    traineeTrainings: TraineePlan[]
}

function TraineeTrainings({traineeTrainings}:TraineeTrainingsProps) {
    const today = new Date()
    const [selectedDay, setSelectedDay] = useState<Date>(today)

    if(traineeTrainings.length === 0) return "Brak treningu"

    return ( 
        <div>
            <div className="flex justify-between w-full mb-4">
                {[...Array(7).keys()].map((_, index) => {
                    const currentMapDate = addDays(today, index)
                    const isSelected = isSameDay(currentMapDate, selectedDay)
                    const isATrainingDay = traineeTrainings.some(plan =>
                        plan.plan.some(x => isSameDay(new Date(x.date), currentMapDate))
                    )
                    return (
                        <div
                            className={`p-2 flex items-center justify-center font-mono text-center border-1 rounded-full w-12 h-12 ${isSelected ? "border-white text-white border-2" : isATrainingDay ? "border-green text-green border-2" : "border-gray-400 text-gray-400"}`}
                            key={index}
                            onClick={() => setSelectedDay(currentMapDate)}
                        >
                            {format(currentMapDate, "dd")}
                        </div>
                    )
                })}
            </div>
            <SubTrainings plans={traineeTrainings} selectedDay={selectedDay}/>
        </div>
     );
}

export default TraineeTrainings;