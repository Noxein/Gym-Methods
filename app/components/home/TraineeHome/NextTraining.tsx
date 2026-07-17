'use client'
import { TraineePlan } from "@/app/types";
import { format, isSameDay } from "date-fns";
import TodaysTraining from "./TodaysTraining";
import { useTranslations } from "next-intl";

type NextTrainingProps = {
    plans: TraineePlan[],
    selectedDay: Date,
}

function NextTraining({ plans, selectedDay }: NextTrainingProps) {
    const t = useTranslations("Home/TraineeHome")

    const today = new Date()
    const isSelectedDayToday = isSameDay(selectedDay, today)

    // Find the plan and day index that matches today (for starting training)
    let todayPlan: TraineePlan | null = null
    let todaysTrainingIndex = -1
    for (const plan of plans) {
        const idx = plan.plan.findIndex(day => !day.iscompleted && isSameDay(new Date(day.date), today))
        if (idx !== -1) {
            todayPlan = plan
            todaysTrainingIndex = idx
            break
        }
    }

    // Find the plan and day that matches the selected day
    let selectedPlan: TraineePlan | null = null
    let selectedDayPlan = null
    for (const plan of plans) {
        const day = plan.plan.find(d => isSameDay(new Date(d.date), selectedDay))
        if (day) {
            selectedPlan = plan
            selectedDayPlan = day
            break
        }
    }

    const minTime2 = selectedDayPlan?.exercises.reduce((min, exercise) => {
        return min + exercise.sets.length * 180
    }, 0) || 0

    const timeInHoursWithPartial = Math.floor(minTime2 / 3600) + (minTime2 % 3600) / 3600

    return ( 
        <div>
            {isSelectedDayToday && todayPlan && todaysTrainingIndex !== -1
                ? <TodaysTraining training={todayPlan} currentDay={todaysTrainingIndex} planLength={todayPlan.plan.length}/>
                : <div className="mt-5 text-gray-200">
                    {t("OnDate", {date: format(selectedDay, "dd/MM/yyyy")})}
                    {selectedDayPlan && selectedPlan
                        ? <div>
                            {t("YouHaveTraining", {name: selectedDayPlan.name, current: selectedPlan.plan.indexOf(selectedDayPlan) + 1, total: selectedPlan.plan.length})}
                          </div>
                        : <div>{t("NoTrainingScheduled")}</div>
                    }
                    {selectedDayPlan && <p className="text-gray-400">{t("TimeRange", {start: timeInHoursWithPartial, end: timeInHoursWithPartial + 0.5})}</p>}
                  </div>
            }
        </div>
    );
}

export default NextTraining;
