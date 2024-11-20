import { useTranslations } from 'next-intl'
import { CenterComponent } from '../CenterComponent'
import { GoBackHomeComponent } from '../GoBackHomeComponent'

export const ExerciseNotFound = () => {
  const t = useTranslations('')
  return (
    <CenterComponent>
        <GoBackHomeComponent>
            <h1 className='text-2xl text-center'>{t("ExerciseNotFound")}</h1>
        </GoBackHomeComponent>
    </CenterComponent>
  )
}
