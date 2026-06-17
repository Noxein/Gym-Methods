'use client'
import { useState } from 'react'
import { createTrainerCustomHandle } from '@/app/trainerActions'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type CreateHandleFormProps = {
    onSuccess?: () => void
}

export const CreateHandleForm = ({ onSuccess }: CreateHandleFormProps) => {
    const [handleName, setHandleName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const t = useTranslations('Home/Profile/My-Trainees/Handles')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await createTrainerCustomHandle(handleName)

        setLoading(false)

        if(!result.success) {
            return setError(result.error || 'Something went wrong')
        }

        setHandleName('')
        router.refresh()
        onSuccess?.()
    }

    return (
        <form onSubmit={handleSubmit} className='bg-dark/50 p-6 rounded-lg border border-darkLight shadow shadow-black flex flex-col gap-4'>
            <h2 className='text-white font-bold text-lg'>{t('CreateNewHandle')}</h2>

            <Input
                labelName={t('HandleName')}
                value={handleName}
                onChange={(e) => setHandleName(e.target.value)}
                placeholder={t('EnterHandleName')}
                disabled={loading}
                required
            />

            <ErrorDiv error={error} />

            <Button
                type='submit'
                isPrimary
                disabled={loading || !handleName.trim()}
                className='w-full'
            >
                {loading ? t('Creating') : t('CreateHandle')}
            </Button>
        </form>
    )
}
