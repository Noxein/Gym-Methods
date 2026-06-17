'use client'
import { useState } from 'react'
import { createCustomExercise } from '@/app/trainerActions'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type CreateExerciseFormProps = {
    onSuccess?: () => void
}

export const CreateExerciseForm = ({ onSuccess }: CreateExerciseFormProps) => {
    const [exerciseName, setExerciseName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const t = useTranslations('Home/Profile/My-Trainees/Exercises')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await createCustomExercise(exerciseName, description || undefined, category || undefined)
        
        setLoading(false)

        if(!result.success) {
            return setError(result.error || 'Something went wrong')
        }

        setExerciseName('')
        setDescription('')
        setCategory('')
        router.refresh()
        onSuccess?.()
    }

    return (
        <form onSubmit={handleSubmit} className='bg-dark/50 p-6 rounded-lg border border-darkLight shadow shadow-black flex flex-col gap-4'>
            <h2 className='text-white font-bold text-lg'>{t('CreateNewExercise')}</h2>
            
            <Input 
                labelName={t('ExerciseName')}
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder={t('EnterExerciseName')}
                disabled={loading}
                required
            />

            <div>
                <label className='text-white text-sm'>{t('Description')}</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('EnterDescription')}
                    disabled={loading}
                    className='w-full bg-dark/70 text-white border border-borderInteractive rounded p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green'
                    rows={3}
                />
            </div>

            <Input 
                labelName={t('Category')}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t('CategoryPlaceholder')}
                disabled={loading}
            />

            <ErrorDiv error={error} />

            <Button 
                type='submit'
                isPrimary
                disabled={loading || !exerciseName.trim()}
                className='w-full'
            >
                {loading ? t('Creating') : t('CreateExercise')}
            </Button>
        </form>
    )
}
