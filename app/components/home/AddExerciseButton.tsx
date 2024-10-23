import Link from 'next/link'
import React from 'react'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { LinkWithIcon } from '../ui/LinkWithIcon'

export const AddExerciseButton = () => {
  return (
    <LinkWithIcon className='bg-green mx-5 mt-4' linkText='Dodaj ćwiczenie' href={'/home/add-exercise'} childrenIcon={
      <Icon>
        <PlusIcon />
      </Icon>
    }/>
  )
}
