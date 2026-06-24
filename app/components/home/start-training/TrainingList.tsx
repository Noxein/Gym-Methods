'use client'

import { useState } from 'react'
import Link from 'next/link'
import LongTermTrainingBtn from './LongTermTrainingBtn'
import { BigTrainingStarter } from '@/app/types'
import { useTranslations } from 'next-intl'
import { Button } from '../../ui/Button'

type TrainingListTypes = {
  trainingList: BigTrainingStarter[] | undefined
}
export const TrainingList = ({trainingList}:TrainingListTypes) => {
  const t = useTranslations("Home/Start-Training")
  const [showAll, setShowAll] = useState(false)
  const visibleTrainings = showAll ? trainingList : trainingList?.slice(0, 3)

  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>

        {visibleTrainings && visibleTrainings.map(x=>(
            <Link href={`/home/start-training/${x.id}`} key={x.id}>
              <LongTermTrainingBtn training={x}/>
            </Link>
        ))}

        {trainingList && trainingList.length > 3 && (
          <Button
            type='button'
            className='sticky bottom-20 z-10 self-center mt-2 px-5 text-sm w-full shadow-lg'
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? t("ShowLess") : t("ShowMore")}
          </Button>
        )}

    </div>
  )
}
