'use client'
import { useState } from 'react'
import { CustomExercise } from '@/app/types'
import { deleteCustomExercise } from '@/app/trainerActions'
import { Button } from '@/app/components/ui/Button'
import { Icon } from '@/app/components/Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type ExerciseCardProps = {
    exercise: CustomExercise
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const t = useTranslations('Home/Profile/My-Trainees/Exercises')

    const handleDelete = async () => {
        if(!confirm(t('ConfirmDeleteExercise'))) return

        setLoading(true)
        setError('')

        const result = await deleteCustomExercise(exercise.id)
        setLoading(false)

        if(!result.success) {
            return setError(result.error || 'Something went wrong')
        }

        router.refresh()
    }

    const createdDate = new Date(exercise.created_at).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    return (
        <div className='bg-dark/50 border border-darkLight shadow shadow-black rounded-lg p-4 flex flex-col gap-3'>
            <div className='flex justify-between items-start gap-4'>
                <div className='flex-1'>
                    <h3 className='text-white font-bold text-lg'>{exercise.exercise_name}</h3>
                    {exercise.category && (
                        <p className='text-gray-400 text-sm'>{exercise.category}</p>
                    )}
                </div>
                <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className='bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red p-2'
                >
                    <Icon>
                        <TrashIcon fill='#ef4444' />
                    </Icon>
                </Button>
            </div>

            {exercise.description && (
                <p className='text-gray-300 text-sm'>{exercise.description}</p>
            )}

            <div className='text-gray-500 text-xs'>
                {t('CreatedOn')}: {createdDate}
            </div>

            {error && (
                <div className='text-red-400 text-sm'>{error}</div>
            )}
        </div>
    )
}
