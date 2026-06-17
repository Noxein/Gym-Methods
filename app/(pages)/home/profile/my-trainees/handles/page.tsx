import { getTrainerCustomHandles } from '@/app/trainerActions'
import { CreateHandleForm } from '@/app/components/profile/my-trainees/handles/CreateHandleForm'
import { HandlesList } from '@/app/components/profile/my-trainees/handles/HandlesList'
import { MetaDataTranslations } from '@/app/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
    const t = await MetaDataTranslations()
    return {
        title: t('Handles')
    }
}

export default async function page() {
    const handles = await getTrainerCustomHandles()
    const t = await getTranslations('Home/Profile/My-Trainees/Handles')

    return (
        <div className='min-h-screen bg-dark p-4 md:p-6 mb-20'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-white font-bold text-3xl mb-8'>{t('CustomHandles')}</h1>

                <div className='grid grid-cols-1 gap-6'>
                    <div className='lg:col-span-1 h-fit'>
                        <CreateHandleForm />
                    </div>

                    <div className='col-span-1'>
                        <HandlesList handles={handles} />
                    </div>
                </div>
            </div>
        </div>
    )
}
