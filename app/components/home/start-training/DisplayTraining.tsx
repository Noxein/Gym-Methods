'use client'
import { ActionTypes, AddExerciceReducerType, TrainingExerciseType } from '@/app/types'
import React, { useReducer, useState } from 'react'
import { AddExercise } from '../../add-exercise/AddExercise'
import { AddExerciceReducer } from '@/app/lib/reducers'
import { AddExerciseAction, closeTraining, createTraining, updateCurrentTraining } from '@/app/actions'
import { usePathname } from 'next/navigation'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'

type DisplayTrainingTypes = {
    training?: TrainingExerciseType[],
    showTempo: boolean,
    exercisesThatRequireTimeMesure: string[],
    trainingPlanId: string,
    lastid: number,
    trainingid: string,
    trainingName:string,
}

const init = {
    weight: 0,
    repeat: 0,
    tempoUp: 0,
    tempoDown: 0,
    series:[],
    difficultyLevel: "easy" as const,
    time: ''
}

export const DisplayTraining = ({training,showTempo,exercisesThatRequireTimeMesure,trainingPlanId,lastid,trainingid,trainingName}:DisplayTrainingTypes) => {
    const[currentExercise,setCurrentExercise] = useState(lastid)
    const showTimeMesure = exercisesThatRequireTimeMesure.includes(training![currentExercise].exercisename)
    const pathname = usePathname()
    const[error,setError] = useState('')
    const[trainingID,setTrainingID] = useState(trainingid)
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
    const[isLoading,setIsLoading] = useState(false)

    const skipExercise = async () => {
        setIsLoading(true)
        let id = trainingID
        if(!trainingID){
            const trainingPlanid = await createTraining(trainingPlanId)
            id = trainingPlanid
            setTrainingID(id)
        }
        await updateCurrentTraining(training![currentExercise].exerciseid,id)
        
        setCurrentExercise(currentExercise+1)
        setIsLoading(false)
    }

    const nextExercise = async (goToNextExercise:boolean) => {
        setIsLoading(true)
        let id = trainingID
        if(!trainingID){
            const trainingPlanid = await createTraining(trainingPlanId)
            id = trainingPlanid
            setTrainingID(id)
        }
        
        //save to database 
        console.log('ID',id,training![currentExercise].exerciseid,state.series,state.difficultyLevel)
        const possibleError = await AddExerciseAction(false,training![currentExercise].exerciseid,state.series,state.difficultyLevel,pathname.includes('training'),id)
        if(possibleError && possibleError.errors){
            setIsLoading(false)
            return setError(possibleError.errors)
        } 
        await updateCurrentTraining(training![currentExercise].exerciseid,id)
        dispatch({type:'RESETSTATE'});
        localStorage.removeItem(`${training![currentExercise].exercisename}`)
        setError('')
        if(goToNextExercise) setCurrentExercise(currentExercise+1)
        setIsLoading(false)
    }
    const handleCloseTraining = async() => {
        const goToNextExercise = false
        await nextExercise(goToNextExercise)
        setIsLoading(true)
        const isError = await closeTraining('/home')
        if(isError && isError.error) return setError(isError.error)
        setIsLoading(false)
    }
  return (
    <div className='flex flex-col min-h-[calc(100dvh-25px)]'>
        <div className='text-white flex justify-between mt-2 mx-4 items-center'>
            <div>
                <h1 className='text-2xl'>{trainingName}</h1>
            </div>
            <div className='text-gray-400'>
                {currentExercise+1} z {training!.length}
            </div>
        </div>
        {
            isLoading? <DisplayTrainingSkeleton isTraining={true}/> :
        <>
        {training && <AddExercise name={training[currentExercise].exercisename} isLoading={isLoading} showTempo={showTempo} showTimeMesure={showTimeMesure} isTraining={true} state={state} dispatch={dispatch}/>}
        </>
        }
        {error && <div className='text-red-500'>{error}</div>}
        <div className='mb-24 text-white mt-auto flex mx-5 gap-4'>
            
            {currentExercise+1 === training?.length? <>
                <button onClick={handleCloseTraining} disabled={isLoading}  className='flex-1 bg-green py-4 rounded-lg'>Zakończ Trening</button>
            </>:<>
                <button className='flex-1 bg-red py-4 rounded-lg' onClick={skipExercise} disabled={isLoading}>Pomiń ćwiczenie</button>
                <button onClick={()=>nextExercise(true)} className='flex-1 bg-green py-4 rounded-lg' disabled={isLoading}>Następne ćwiczenie</button>
            </>}
        </div>
        
    </div>)
}
