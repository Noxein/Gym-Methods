import { fetchIncomingTrainings } from '@/app/actions'
import React from 'react'
import { Training } from './Training'
import { getDay } from 'date-fns'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import { ButtonWithIcon } from '../ui/ButtonWithIcon'
import { LinkWithIcon } from '../ui/LinkWithIcon'

export const IncomingTrainings = async () => {
    const trainings = await fetchIncomingTrainings()
    const currentWeekDay = -1 === getDay(new Date()) - 1 ? 6 : getDay(new Date()) - 1

  return (
    <div className='flex flex-col px-5 gap-4 mt-8'>
      <h2 className='text-center text-2xl text-marmur'>Najbliższe treningi</h2>
      {trainings.map(training=>(
        <Training training={training} currentWeekDay={currentWeekDay} key={training.id}/>
      ))}
      <LinkWithIcon className='bg-green' linkText='Dodaj nowy trening' href={'/home/profile/my-training-plans?showAddModal=true'} childrenIcon={
        <Icon>
          <PlusIcon />
        </Icon>
      }/>
    </div>
  )
}


