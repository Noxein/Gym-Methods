'use client'
import { UserTrainingPlan } from "@/app/types"
import Link from "next/link"
import { Icon } from "../Icon"
import { StartWorkoutIcon } from "@/app/ui/icons/ExpandIcon"
import { useTranslations } from "next-intl"

type TrainingTypes = {
    training:  UserTrainingPlan,
  }
  
export const Training = ({training}:TrainingTypes) => {

    const u = useTranslations('Utils')
    
    return (
      <Link href={`/home/start-training/${training.trainingname}`} className={`flex border-marmur justify-between items-center pt-3 border-[1px] rounded-lg py-2 text-marmur px-4`}>
        <div className="flex flex-col leading-3">
            <span>{training.trainingname}</span>
            <span className="text-gray-400 text-sm">{u("WeekDayEnglish",{day: training.weekday})}</span>
        </div>
        <Icon>
            <StartWorkoutIcon fill={'#D9D9D9'}/>
        </Icon>
      </Link>
    )
  }