import React, { useState } from 'react'
import { FirstSetupFinish } from '@/app/actions'
import { Button } from '../ui/Button'
import { useRouter } from 'next/navigation'
import { dataType } from './SetupOneOfThree'
import { ErrorDiv } from '../ui/ErrorDiv'
import { SmallLoaderDiv } from '../ui/SmallLoaderDiv'

type StepTwoOutOfThree = {
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>,
    exercisesToDelete: string[],
    setExercisesToDelete: React.Dispatch<React.SetStateAction<string[]>>,
    favouriteExercises: string[],
    data: dataType,
}
export const StepTwoOutOfThree = ({setCurrentStep,exercisesToDelete,setExercisesToDelete,favouriteExercises,data}:StepTwoOutOfThree) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)
    const router = useRouter()
    
    const redirectToCreateTraining = async () => {
        if(loading) return
        setLoading(true)

        const sendData = await FirstSetupFinish(data,exercisesToDelete,favouriteExercises)
        if(sendData && sendData.error){
            setLoading(false)
            return setError('Coś poszło nie tak')
        } 
        setLoading(false)
        router.push('/home/profile/my-training-plans?showAddModal=true')
    }
    return (
        <div className='flex flex-col text-white gap-8 mx-5 justify-center h-screen'>
            <Button className='text-xl' onClick={redirectToCreateTraining} isPrimary disabled={loading}>
                Chcę stworzyć własny trening
            </Button>
            <Button className='text-xl' onClick={()=>setCurrentStep(page=>page+1)} isPrimary disabled={loading}>
                Chcę gotowy trening
            </Button>

            <SmallLoaderDiv loading={loading}/>
            <ErrorDiv error={error}/>
            
            <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 py-5 bg-dark`}>
                <Button className='text-xl flex-1' onClick={()=>setCurrentStep(page=>page-1)} disabled={loading}>
                    Wstecz
                </Button>
            </div>
        </div>
    )
}
