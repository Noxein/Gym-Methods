import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { LinkWithIcon } from '../ui/LinkWithIcon'
import { useTranslations } from 'next-intl'

export const AddExerciseButton = () => {
  const t = useTranslations("Home")
  return (
    <LinkWithIcon className='bg-green mx-5 mt-4' linkText={t('AddExercise')} href={'/home/add-exercise'} childrenIcon={
      <Icon>
        <PlusIcon />
      </Icon>
    }/>
  )
}
