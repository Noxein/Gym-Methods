'use client'
import { nameTrimmer } from '@/app/lib/utils'
import { GymExercisesDbResult } from '@/app/types'
import { format, subHours } from 'date-fns'
import { useTranslations } from 'next-intl'

type CompletedTrainingTypes = {
    training: GymExercisesDbResult[],
    trainingName:string,
    trainingDate:Date,
}

export const CompletedTraining = ({training,trainingName,trainingDate}:CompletedTrainingTypes) => {

    const offset = new Date(trainingDate).getTimezoneOffset()/60
    const finishHour = subHours(new Date(trainingDate),offset)

    const t = useTranslations("Home")
    const d = useTranslations("DefaultExercises")
  return (
    <div className={`text-marmur border-marmur border-[1px] flex-1 py-2 px-2 rounded-lg min-h-36 min-w-80`}>
        <div className='flex justify-between'>
            <span className='text-xl'>{trainingName}</span>
            <span className='text-gray-500 text-xs'>{format(finishHour,'dd-MM-yyyy')}</span>
        </div>
        <div className='pt-2'>
                {training.map((exercise,index)=>(
                    <div className={`border-t-[1px] border-b-[1px] text-gray-400 border-gray-500 flex justify-between mx-4 px-2 py-[2px]`} key={index}>
                        {exercise.exerciseid.length>=20?(
                        <span title={exercise.exerciseid}>{d(nameTrimmer(exercise.exerciseid)).slice(0,20)}...</span>
                        ):(
                        <span>{d(nameTrimmer(exercise.exerciseid))}</span>
                        )}
                        
                        <span>{exercise.sets.length} {t("Series",{lastNumber: (exercise.sets.length.toLocaleString())[exercise.sets.length-1]})}</span>
                    </div>
                ))}
            </div>
    </div>
  )
}
