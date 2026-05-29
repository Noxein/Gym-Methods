import React, { useState } from 'react'
import { FirstSetupFinish } from '@/app/actions'
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
    
    const redirectToCreateTraining = async () => {
        if(loading) return
        setLoading(true)

        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error){
            setLoading(false)
            return setError(e('Something Went Wrong'))
        } 
        await update({ refresh: true })
        setLoading(false)
        router.push('/home/profile/my-training-plans?showAddModal=true')
    }

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    return (
        <div className='flex flex-col text-white gap-8 mx-5 justify-center h-screen'>
            <Button className='text-xl' onClick={redirectToCreateTraining} isPrimary disabled={loading}>
                {t("WantMyOwnTraining")}
            </Button>
            <Button className='text-xl' onClick={()=>setCurrentStep('fav-exercises')} isPrimary disabled={loading}>
                {t("WantReadyTraining")}
            </Button>

            <SmallLoaderDiv loading={loading}/>
            <ErrorDiv error={error}/>
            
            <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 py-5 bg-dark`}>
                <Button className='text-xl flex-1' onClick={()=>setCurrentStep('goal')} disabled={loading}>
                {t("Back")}
                </Button>
            </div>
        </div>
    )
}
