import { LinkWithIcon } from '@/app/components/ui/LinkWithIcon'
import { useTranslations } from 'next-intl'

export const ErrorTrainingQuery = ({error}:{error:string}) => {
    const t = useTranslations("Home/Profile/My-Training-Plans/[TrainingPlanName]")
    const e = useTranslations("Errors")
    return (
        <div className='text-2xl text-white flex -mt-20 flex-col gap-4 justify-center h-screen mx-5'>
            <h1 className='text-center'>{e(error)}</h1>
            <LinkWithIcon href={'/home/profile/my-training-plans'} linkText={t("BackToTrainings")}
                className='border-green border-1 text-green'
                centerText
            ></LinkWithIcon>
        </div>
      )
}
