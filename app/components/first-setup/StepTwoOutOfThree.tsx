import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useState } from 'react'
import { exerciseList } from '@/app/lib/exercise-list'
import { Mapper } from './Mapper'
import { FirstSetupFinish, SecondStepDataValidation } from '@/app/actions'
import { Button } from '../ui/Button'
import { useRouter } from 'next/navigation'
import { dataType } from './SetupOneOfThree'

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
    const theme = useContext(ThemeContext)
    const router = useRouter()
    
    const redirectToCreateTraining = async () => {
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
            <Button className='border-green border-4 text-xl' onClick={redirectToCreateTraining} isPrimary>
                Chcę stworzyć własny trening
            </Button>
            <Button className='border-green border-4 text-xl' onClick={()=>setCurrentStep(page=>page+1)} isPrimary>
                Chcę gotowy trening
            </Button>

            <div className={`fixed bottom-0 left-0 right-0 flex gap-2 px-5 py-5 bg-${theme?.colorPallete.primary}`}>
                <button onClick={()=>setCurrentStep(page=>page-1)} className='flex-1 text-white bg-red py-3 rounded-lg font-semibold text-2xl'>Wstecz</button>
            </div>
        </div>
    )
}
