'use client'
import { UserTrainingPlan } from "@/app/types"
import Link from "next/link"
import { Icon } from "../Icon"
import { StartWorkoutIcon } from "@/app/ui/icons/ExpandIcon"
import { ConvertEnglishWeekDayToPolish, WeekDayArrayPL } from "@/app/lib/utils"

type TrainingTypes = {
    training:  UserTrainingPlan,
    currentWeekDay: number,
  }
  
export const Training = ({training,currentWeekDay}:TrainingTypes) => {
    const weekday = ConvertEnglishWeekDayToPolish(training.weekday)
    
    return (
      <Link href={`/home/start-training/${training.trainingname}`} className={`flex border-marmur justify-between items-center pt-3 border-[1px] rounded-lg py-2 text-marmur px-4`}>
        <div className="flex flex-col leading-3">
            <span>{training.trainingname}</span>
            <span className="text-gray-400 text-sm">{weekday}</span>
        </div>
        <Icon>
            <StartWorkoutIcon fill={currentWeekDay===WeekDayArrayPL.indexOf(training.weekday)?'#3C9F65':'#D9D9D9'}/>
        </Icon>
      </Link>
    )
  }