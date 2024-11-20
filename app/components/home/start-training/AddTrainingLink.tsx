'use client'
import React from 'react'
import { LinkWithIcon } from '../../ui/LinkWithIcon'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'

export const AddTrainingLink = () => {

    const t = useTranslations("Home/Start-Training")
    
  return (
    <LinkWithIcon
        childrenIcon={
        <Icon className='bg-opacity-0'>
            <PlusIcon />
        </Icon>
    }
    href={'/home/profile/my-training-plans?showAddModal=true'}
    linkText={t("AddNewTraining")}
    className='bg-green mx-5 py-4 text-xl mt-4'
  />
  )
}
