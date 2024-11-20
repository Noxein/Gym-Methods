import React from 'react'
import { LinkWithIcon } from '../ui/LinkWithIcon'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'

export const NewTrainingBtn = () => {

    const t = useTranslations('Home');
    
  return (
    <LinkWithIcon className='bg-green' linkText={t('AddNewTraining')} href={'/home/profile/my-training-plans?showAddModal=true'} childrenIcon={
        <Icon>
          <PlusIcon />
        </Icon>
      }/>
  )
}
