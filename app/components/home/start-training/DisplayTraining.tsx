'use client'
import { ActionTypes, AddExerciceReducerType, ExerciseTypes, TrainingExerciseType, UserExercise } from '@/app/types'
import React, { useContext, useReducer, useState } from 'react'
import { AddExercise } from '../../add-exercise/AddExercise'
import { AddExerciceReducer } from '@/app/lib/reducers'
import { AddExerciseAction, closeTraining, createTraining, updateCurrentTraining } from '@/app/actions'
import { usePathname } from 'next/navigation'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'
import { ChangeExerciseList } from './ChangeExerciseList'
import { MapExercises } from '../../profile/my-training-plans/trainingPlanName/MapExercises'
import { PreviousExercise } from './PreviousExercise'
import { ModalContexts } from './ModalContexts'
import { Icon } from '../../Icon'
import { SettingsIcon, SpeedIcon } from '@/app/ui/icons/ExpandIcon'

type DisplayTrainingTypes = {
    training?: TrainingExerciseType[],
    showTempo: boolean,
    exercisesThatRequireTimeMesure: string[],
    trainingPlanId: string,
    lastid: number,
    trainingid: string,
    trainingName:string,
    exercises: ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
}

const init = {
    weight: 0,
    repeat: 0,
    tempoUp: 0,
    tempoDown: 0,
    side: 'Both' as const,
    series:[],
    difficultyLevel: "easy" as const,
    time: ''
}

export const DisplayTraining = ({training,showTempo,exercisesThatRequireTimeMesure,trainingPlanId,lastid,trainingid,trainingName,exercises,allExercisesInOneArray}:DisplayTrainingTypes) => {
    const[exercisesLeft,setExercisesLeft] = useState<TrainingExerciseType[]>(training!)
    const[currentExercise,setCurrentExercise] = useState(exercisesLeft[0])
    const[totalNumberOfTrainigs,setTotalNumberOfTrainigs] = useState(training?.length||1)
    const[exercisesDone,setExercisesDone] = useState(1)

    const showTimeMesure = exercisesThatRequireTimeMesure.includes(currentExercise.exercisename)
    const pathname = usePathname()

    const[error,setError] = useState('')
    const[trainingID,setTrainingID] = useState(trainingid)
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
    const[isLoading,setIsLoading] = useState(false)
    const modalsContext = useContext(ModalContexts)

    const skipExercise = async () => {
        setIsLoading(true)
        let id = trainingID
        if(!trainingID){
            const trainingPlanid = await createTraining(trainingPlanId)
            id = trainingPlanid
            setTrainingID(id)
        }
        await updateCurrentTraining(id,exercisesLeft)
        
        setExercisesLeft(exercisesLeft.slice(1,exercisesLeft.length))
        setExercisesDone(prev=>prev+1)
        setCurrentExercise(exercisesLeft[1])
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
        
        const possibleError = await AddExerciseAction(false,currentExercise.exercisename,state.series,pathname.includes('training'),id)
        if(possibleError && possibleError.errors){
            setIsLoading(false)
            return setError(possibleError.errors)
        } 
        await updateCurrentTraining(id,exercisesLeft)
        dispatch({type:'RESETSTATE'});
        localStorage.removeItem(`${currentExercise.exercisename}`)
        setError('')
        if(goToNextExercise) {
            setExercisesLeft(exercisesLeft.slice(1,exercisesLeft.length))
            setExercisesDone(prev=>prev+1)
            setCurrentExercise(exercisesLeft[1])
        }
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
    const handleShowExerciseList = () => {
        modalsContext?.setShowExerciseList(true)
    }
  return (
    <div className='flex flex-col min-h-[calc(100dvh-100px)] mb-24'>
        <div className='text-white flex justify-between mt-2 mx-4 items-center'>
            <div>
                <h1 className='text-2xl'>{trainingName}</h1>
            </div>
            <div className='text-gray-400 flex gap-2 items-center'>
                <button className='bg-green text-white px-2 py-[1px] rounded' onClick={handleShowExerciseList}>
                    <Icon className='py-0 flex items-center'>
                        <SpeedIcon width='20'/>
                    </Icon>
                </button>
                <button className='bg-green text-white px-2 py-[1px] rounded' onClick={handleShowExerciseList}>Zmień</button>
                <span className='text-nowrap'>{exercisesDone} z {totalNumberOfTrainigs}</span>
            </div>
        </div>
        {
            isLoading? <DisplayTrainingSkeleton isTraining={true}/> :
        <>
        {exercisesLeft && <AddExercise name={currentExercise.exercisename} exerciseid={currentExercise.exerciseid} isLoading={isLoading} showTempo={showTempo} showTimeMesure={showTimeMesure} isTraining={true} state={state} dispatch={dispatch}/>}
        </>
        }
        {error && <div className='text-red'>{error}</div>}

            <div className='mx-5 text-white flex gap-4 mt-auto pt-4'>
                {exercisesLeft.length===1? <>
                    <button onClick={handleCloseTraining} disabled={isLoading}  className='flex-1 bg-green py-4 rounded-lg'>Zakończ Trening</button>
                </>:<>
                    <button className='flex-1 bg-red py-4 rounded-lg' onClick={skipExercise} disabled={isLoading}>Pomiń ćwiczenie</button>
                    <button onClick={()=>nextExercise(true)} className='flex-1 bg-green py-4 rounded-lg' disabled={isLoading}>Następne ćwiczenie</button>
                </>}
            </div>
        
        {modalsContext?.showExerciseList && 
        <ChangeExerciseList 
            list={exercisesLeft} 
            setExercisesLeft={setExercisesLeft} 
            setCurrentExercise={setCurrentExercise} 
            />}
        
        {modalsContext?.showAddExerciseModal && 
        <MapExercises 
            setShowAddExercise={modalsContext?.setShowAddExerciseModal} 
            setPlanExercises={setExercisesLeft} 
            allExercisesInOneArray={allExercisesInOneArray} 
            exercises={exercises} 
            isTrainingInProgressPage={true} 
            setCurrentExercise={setCurrentExercise} 
            setTotalNumberOfTrainigs={setTotalNumberOfTrainigs}
            setShowExerciseList={modalsContext?.setShowExerciseList}
            />}
    </div>)
}
