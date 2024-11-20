import { LinkWithIcon } from '@/app/components/ui/LinkWithIcon'
import { useTranslations } from 'next-intl'

type SpecificTrainingDontExistTypes = {
    trainingName:string
}
export const SpecificTrainingDontExist = ({trainingName}:SpecificTrainingDontExistTypes) => {
  const t = useTranslations("Home/Profile/My-Training-Plans/[TrainingPlanName]")
  return (
      <div className='text-2xl text-white flex -mt-20 flex-col justify-center h-screen mx-5 gap-4'>
        <h1 className='text-center'> {t("TrainingDontExist")} <br/> <strong>{trainingName}</strong></h1>
            <LinkWithIcon href={'/home/profile/my-training-plans'} linkText={t("BackToTrainings")}
                className='border-green border-1 text-green'
                centerText
            ></LinkWithIcon>
        </div>
  )
}
