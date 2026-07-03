'use client'
import { useState } from 'react'
import { CustomHandle } from '@/app/types'
import { deleteTrainerCustomHandle } from '@/app/trainerActions'
import { Button } from '@/app/components/ui/Button'
import { Icon } from '@/app/components/Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type HandleCardProps = {
    handle: CustomHandle
}

export const HandleCard = ({ handle }: HandleCardProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const t = useTranslations('Home/Profile/My-Trainees/Handles')

    const handleDelete = async () => {
        if(!confirm(t('ConfirmDeleteHandle'))) return

        setLoading(true)
        setError('')

        const result = await deleteTrainerCustomHandle(handle.id)
        setLoading(false)

        if(!result.success) {
            return setError(result.error || 'Something went wrong')
        }

        router.refresh()
    }

    const createdDate = new Date(handle.created_at).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    return (
        <div className='bg-dark/50 border border-darkLight shadow shadow-black rounded-lg p-4 flex flex-col gap-3'>
            <div className='flex justify-between items-start gap-4'>
                <div className='flex-1'>
                    <h3 className='text-white font-bold text-lg'>{handle.handle_name}</h3>
                </div>
                <Button
                    onClick={handleDelete}
                    loading={loading}
                    className='bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red p-2'
                >
                    <Icon>
                        <TrashIcon fill='#ef4444' />
                    </Icon>
                </Button>
            </div>

            <div className='text-gray-500 text-xs'>
                {t('CreatedOn')}: {createdDate}
            </div>

            {error && (
                <div className='text-red-400 text-sm'>{error}</div>
            )}
        </div>
    )
}
