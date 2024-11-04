import { LinkWithIcon } from '@/app/components/ui/LinkWithIcon'

export const ErrorTrainingQuery = ({error}:{error:string}) => {
    return (
        <div className='text-2xl text-white flex -mt-20 flex-col gap-4 justify-center h-screen mx-5'>
            <h1 className='text-center'>{error}</h1>
            <LinkWithIcon href={'/home/profile/my-training-plans'} linkText='Powrót do Treningów'
                className='border-green border-1 text-green'
                centerText
            ></LinkWithIcon>
        </div>
      )
}
