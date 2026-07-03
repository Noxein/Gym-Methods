import React, { useState } from 'react'
import { FirstSetupFinish, firstSetupOwnTraining } from '@/app/actions'
import { Button } from '@/app/components/ui/Button'
import { useRouter } from 'next/navigation'
import { dataType } from '@/app/components/first-setup/Casual/Goal'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { SmallLoaderDiv } from '@/app/components/ui/SmallLoaderDiv'
import { useTranslations } from 'next-intl'
import { FirstSetupSelectedSteps } from '@/app/types'
import { useSession } from 'next-auth/react'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupSelectedSteps>>,
    exercisesToDelete: string[],
    setExercisesToDelete: React.Dispatch<React.SetStateAction<string[]>>,
    favouriteExercises: string[],
    data: dataType,
}
export const TrainingCreator = ({setCurrentStep,exercisesToDelete,setExercisesToDelete,favouriteExercises,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)
    const router = useRouter()
    const { update } = useSession()

    const myOwnTraining = async () => {
        if(loading) return
        setLoading(true)
        const result = await firstSetupOwnTraining(data)
        if(result && result.error){
            setLoading(false)
            return setError(e('Something Went Wrong'))
        }
        await update({ refresh: true })
        router.push('/home/profile/my-training-plans?showAddModal=true')
        setLoading(false)
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    return (
        <div className='flex flex-col text-white gap-8 mx-5 justify-center h-screen'>
            <div className='flex flex-1 flex-col gap-4 justify-center'>
                <Button className='text-xl' onClick={myOwnTraining} isPrimary loading={loading}>
                    {t("WantMyOwnTraining")}
                </Button>
                <Button className='text-xl' onClick={()=>setCurrentStep('fav-exercises')} isPrimary loading={loading}>
                    {t("WantReadyTraining")}
                </Button>

                <SmallLoaderDiv loading={loading}/>
                <ErrorDiv error={error}/>
            </div>

            
           
            <Button className='text-xl mt-auto mb-5' onClick={()=>setCurrentStep('goal')} loading={loading}>
                {t("Back")}
            </Button>
          
        </div>
    )
}
