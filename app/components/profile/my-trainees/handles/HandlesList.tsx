'use client'
import { CustomHandle } from '@/app/types'
import { HandleCard } from './HandleCard'
import { useTranslations } from 'next-intl'

type HandlesListProps = {
    handles: CustomHandle[]
}

export const HandlesList = ({ handles }: HandlesListProps) => {
    const t = useTranslations('Home/Profile/My-Trainees/Handles')

    if(handles.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-400 text-lg'>{t('NoCustomHandles')}</p>
                <p className='text-gray-500 text-sm mt-2'>{t('CreateYourFirstHandle')}</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            {handles.map((handle) => (
                <HandleCard key={handle.id} handle={handle} />
            ))}
        </div>
    )
}
