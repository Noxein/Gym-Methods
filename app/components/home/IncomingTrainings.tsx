import { fetchIncomingTrainings } from '@/app/actions'
import React from 'react'
import { Training } from './Training'
import { getDay } from 'date-fns'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'

export const IncomingTrainings = async () => {
    const trainings = await fetchIncomingTrainings()
    const currentWeekDay = -1 === getDay(new Date()) - 1 ? 6 : getDay(new Date()) - 1
  return (
    <div className='flex flex-col px-5 gap-4 mt-8'>
      <h2 className='text-center text-2xl text-marmur'>Najbliższe treningi</h2>
      {trainings.map(training=>(
        <Training training={training} currentWeekDay={currentWeekDay} key={training.id}/>
      ))}
      <Link className={`flex justify-between px-5 bg-green text-white py-2 rounded-lg items-center`} href={'/home/profile/my-training-plans?showAddModal=true'}>
        <span>Dodaj nowy trening</span>
        <Icon>
          <PlusIcon />
        </Icon>
      </Link>
    </div>
  )
}


