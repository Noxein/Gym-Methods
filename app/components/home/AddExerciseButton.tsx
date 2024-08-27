import Link from 'next/link'
import React from 'react'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'

export const AddExerciseButton = () => {
  return (
    <Link className={`flex justify-between px-5 mx-5 mt-5 bg-green text-white py-2 rounded-lg items-center`} href={'/home/add-exercise'}>
    <span>Dodaj ćwiczenie</span>
    <Icon>
      <PlusIcon />
    </Icon>
  </Link>
  )
}
