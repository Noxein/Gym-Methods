'use client'
import { ActionTypes, AddExerciceReducerType, ExercisesThatRequireTimeMesureOrHandle, ExerciseTypes, TrainingExerciseType, UserExercise } from '@/app/types'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AddExercise } from '../../add-exercise/AddExercise'
import { AddExerciceReducer } from '@/app/lib/reducers'
import { AddExerciseAction, closeTraining, createTraining, updateCurrentTraining } from '@/app/actions'
import { usePathname, useRouter } from 'next/navigation'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'
import { ChangeExerciseList } from './ChangeExerciseList'
import { MapExercises } from '../../profile/my-training-plans/trainingPlanName/MapExercises'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ConfirmEndTrainingModal } from './ConfirmEndTrainingModal'

type DisplayTrainingTypes = {
    training?: TrainingExerciseType[],
    trainingPlanId: string,
    lastid: number,
    trainingid: string,
    trainingName:string,
    exercises: ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
    allHandles: {
        id: string;
        handlename: string;
    }[],
    ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[],
    ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[],
}

const init = {
    weight: 0,
    repeat: 0,
    side: 'Both' as const,
    series:[],
    difficultyLevel: "easy" as const,
    time: ''
}

export const DisplayTraining = ({training,trainingPlanId,lastid,trainingid,trainingName,exercises,allExercisesInOneArray,allHandles,ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure}:DisplayTrainingTypes) => {
    console.log(training)
    const[exercisesLeft,setExercisesLeft] = useState<TrainingExerciseType[]>(training!)
    const[currentExercise,setCurrentExercise] = useState(exercisesLeft[0])
    const[totalNumberOfTrainigs,setTotalNumberOfTrainigs] = useState(training?.length||1)
    const[exercisesDone,setExercisesDone] = useState(1)
    const[showConfirmEndTrainingModal,setShowConfirmEndTrainingModal] = useState(false)

    const showTimeMesure = ExercisesThatRequireTimeMesure.some(x=>x.id === currentExercise.exerciseid)
    const requiresHandle = ExercisesThatRequireHandle.some(x=>x.id === currentExercise.exerciseid)

    const pathname = usePathname()
    const router = useRouter()

    const[error,setError] = useState('')
    const[trainingID,setTrainingID] = useState(trainingid)
    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,init)
    const[isLoading,setIsLoading] = useState(false)
    const modalsContext = useContext(ModalContexts)

    const[handle,setHandle] = useState(requiresHandle?'Sznur':'')

    useEffect(()=>{
        if(!requiresHandle) return setHandle('')
            setHandle('Sznur')
    },[currentExercise])
    
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

    const nextExercise = async (goToNextExercise:boolean,isLastExercise?:boolean) => {
        setError('')
        setIsLoading(true)
        let id = trainingID
        if(!trainingID){
            const trainingPlanid = await createTraining(trainingPlanId)
            id = trainingPlanid
            setTrainingID(id)
        }
        
        const possibleError = await AddExerciseAction(false,currentExercise.exercisename,state.series,pathname.includes('training'),id,handle,isLastExercise)
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
    const handleCloseTraining = async () => {
        const goToNextExercise = false
        const isLastExercise = true
        await nextExercise(goToNextExercise,isLastExercise)
        setIsLoading(true)
        const isError = await closeTraining()
        if(isError && isError.error) return setError(isError.error)
        router.push('/home')
        setIsLoading(false)
    }
    const handleCloseTrainingFromModal = async () => {
        if(exercisesDone === 1){
            router.push('/home')
            return true
        }  
        const goToNextExercise = false
        await nextExercise(goToNextExercise)
        await closeTraining('/home')
        return true
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
                {/* <Button className='py-0 px-2 border-0 rounded' onClick={handleShowExerciseList} isPrimary>
                    <Icon className='py-0 flex items-center'>
                        <SpeedIcon width='20'/>
                    </Icon>
                </Button> */}
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={()=>setShowConfirmEndTrainingModal(true)} disabled={isLoading}>Zakończ trening</Button>
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={handleShowExerciseList} disabled={isLoading}>Zmień</Button>
                <span className='text-nowrap'>{exercisesDone} z {totalNumberOfTrainigs}</span>
            </div>
        </div>
        {
            isLoading? <DisplayTrainingSkeleton isTraining={true}/> :
        <>
        {exercisesLeft && <AddExercise name={currentExercise.exercisename} exerciseid={currentExercise.exerciseid} isLoading={isLoading} showTimeMesure={showTimeMesure} isTraining={true} state={state} dispatch={dispatch} requiresHandle={requiresHandle} allHandles={allHandles} setParnetHandle={setHandle}/>}
        </>
        }
        {error && <div className='text-red'>{error}</div>}

            <div className='mx-5 text-white flex gap-4 mt-auto pt-4'>
                {exercisesLeft.length===1? <>
                    <Button className='flex-1' onClick={handleCloseTraining} disabled={isLoading} isPrimary>Zakończ Trening</Button>
                </>:<>
                    <Button className='flex-1' onClick={skipExercise} disabled={isLoading}>Pomiń ćwiczenie</Button>
                    <Button className='flex-1' onClick={()=>nextExercise(true)} disabled={isLoading} isPrimary>Następne ćwiczenie</Button>
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
        {showConfirmEndTrainingModal && 
        <ConfirmEndTrainingModal 
            text='Czy napewno chcesz zakończyć trening?'
            showModal={setShowConfirmEndTrainingModal}
            handleEnd={handleCloseTrainingFromModal}
            />}
    </div>)
}
