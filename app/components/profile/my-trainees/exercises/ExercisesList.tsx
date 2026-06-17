'use client'
import { CustomExercise } from '@/app/types'
import { ExerciseCard } from './ExerciseCard'
import { useTranslations } from 'next-intl'

type ExercisesListProps = {
    exercises: CustomExercise[]
}

export const ExercisesList = ({ exercises }: ExercisesListProps) => {
    const t = useTranslations('Home/Profile/My-Trainees/Exercises')

    if(exercises.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-400 text-lg'>{t('NoCustomExercises')}</p>
                <p className='text-gray-500 text-sm mt-2'>{t('CreateYourFirstExercise')}</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </div>
    )
}
