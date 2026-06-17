import { getTrainerCustomExercises } from '@/app/trainerActions'
import { CreateExerciseForm } from '@/app/components/profile/my-trainees/exercises/CreateExerciseForm'
import { ExercisesList } from '@/app/components/profile/my-trainees/exercises/ExercisesList'
import { MetaDataTranslations } from '@/app/lib/utils'

export async function generateMetadata() {
    const t = await MetaDataTranslations()
    return {
        title: t('Custom exercises')
    }
}

export default async function page() {
    const exercises = await getTrainerCustomExercises()

    return (
        <div className='min-h-screen bg-dark p-4 md:p-6 mb-20'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-white font-bold text-3xl mb-8'>Custom Exercises</h1>
                
                <div className='grid grid-cols-1 gap-6'>
                    {/* Form Section */}
                    <div className='lg:col-span-1 h-fit'>
                        <CreateExerciseForm />
                    </div>

                    {/* Exercises List Section */}
                    <div className='col-span-1'>
                        <ExercisesList exercises={exercises} />
                    </div>
                </div>
            </div>
        </div>
    )
}
