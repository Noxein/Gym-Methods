'use client'
import { ExercisesThatRequireTimeMesureOrHandle, ExerciseTypes, TrainingExerciseType, UserExercise, LocalStorageTraining, UserTrainingPlan } from '@/app/types'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { SaveTrainingToDatabase } from '@/app/actions'
import { usePathname, useRouter } from 'next/navigation'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'
import { ChangeExerciseList } from './ChangeExerciseList'
import { MapExercises } from '../../profile/my-training-plans/trainingPlanName/MapExercises'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ConfirmEndTrainingModal } from './ConfirmEndTrainingModal'
import { AddExerciseUsingState } from '@/app/components/home/start-training/AddExerciseUsingState'

type DisplayTrainingTypes = {
    trainingPlanData: UserTrainingPlan,
    exercisesObject: ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
    allHandles: {
        id: string;
        handlename: string;
    }[],
    ExercisesThatRequireHandle: ExercisesThatRequireTimeMesureOrHandle[],
    ExercisesThatRequireTimeMesure: ExercisesThatRequireTimeMesureOrHandle[],
}


export const DisplayTraining = ({trainingPlanData,exercisesObject,allExercisesInOneArray,allHandles,ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure}:DisplayTrainingTypes) => {
    const initializeLocalStorageData = (trainingName:string,exercises:TrainingExerciseType[]) => {
        const data = localStorage.getItem(trainingName+'training')
        if(data){
            const parsedData = JSON.parse(data) as LocalStorageTraining
            return parsedData
        }
    
        // initalize empty data here
    
        let objectToSaveToLocalStorage:LocalStorageTraining = {
            currentExerciseIndex: 0,
            exercises:[],
            inputData: {
                difficulty : 'easy',
                repeat: 0,
                side: 'Both',
                weight: 0,
                time: '',
            },
            trainingStartDate: new Date()
            }
    
            exercises.map(exercise=>{
                objectToSaveToLocalStorage.exercises.push({
                    id: exercise.id,
                    exerciseId: exercise.exerciseid,
                    exerciseName: exercise.exercisename,
                    sets: [],
                })
            })
            localStorage.setItem(trainingName+'training',JSON.stringify(objectToSaveToLocalStorage))
        return objectToSaveToLocalStorage
    }
    


    const[totalExercises,setTotalExercies] = useState(trainingPlanData.exercises.exercises.length)
    const[showConfirmEndTrainingModal,setShowConfirmEndTrainingModal] = useState(false)
    const[localStorageTrainingData,setLocalStorageTrainingData] = useState<LocalStorageTraining>(initializeLocalStorageData(trainingPlanData.trainingname,trainingPlanData.exercises.exercises) || undefined)
    const[currentExerciseIndex, setCurrentExerciseIndex] = useState(localStorageTrainingData.currentExerciseIndex+1)
    const saveToLocalStorage = useRef(true)

    const currentExerciseName = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseName
    const currentExerciseId = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseId

    const showTimeMesure = ExercisesThatRequireTimeMesure.some(exercise=>exercise.id === currentExerciseId)
    const requiresHandle = ExercisesThatRequireHandle.some(exercise=>exercise.id === currentExerciseId)

    const pathname = usePathname()
    const router = useRouter()

    const[error,setError] = useState('')

    const[loading,setLoading] = useState(false)
    const modalsContext = useContext(ModalContexts)

    useEffect(()=>{
        window.onbeforeunload = function() {
            if(saveToLocalStorage.current){
                localStorage.setItem(trainingPlanData.trainingname+'training',JSON.stringify(localStorageTrainingData))
            }else{
                localStorage.removeItem(trainingPlanData.trainingname+'training')
            }
        };
    
        return () => {
            if(saveToLocalStorage.current){
                localStorage.setItem(trainingPlanData.trainingname+'training',JSON.stringify(localStorageTrainingData))
            }else{
                localStorage.removeItem(trainingPlanData.trainingname+'training')
            }

            window.onbeforeunload = null;
        };
    },[])
    const nextExercise = async () => {
        const length = trainingPlanData.exercises.exercises.length

        if(localStorageTrainingData.currentExerciseIndex === length - 1) return
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.currentExerciseIndex = xCopy.currentExerciseIndex + 1
            return xCopy
        })
        setCurrentExerciseIndex(x=>x+1)
    }

    const previousExercise = async () => {
        if(localStorageTrainingData.currentExerciseIndex === 0) return
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.currentExerciseIndex = xCopy.currentExerciseIndex - 1
            return xCopy
        })
        setCurrentExerciseIndex(x=>x-1)
    }

    const handleCloseTraining = async () => {
        setLoading(true)
        saveToLocalStorage.current = false
        const data = await SaveTrainingToDatabase(trainingPlanData.id,localStorageTrainingData.exercises,localStorageTrainingData.trainingStartDate)
        if(data && data.error){
            setLoading(false)
            return setError(data.error)
        }
        setLoading(false)
    }

    const handleShowExerciseList = () => {
        modalsContext?.setShowExerciseList(true)
    }


  return (
    <div className='flex flex-col min-h-[calc(100dvh-100px)] mb-24'>
        <div className='text-white flex justify-between mt-2 mx-4 items-center'>
            <div>
                <h1 className='text-2xl'>{trainingPlanData.trainingname}</h1>
            </div>
            <div className='text-gray-400 flex gap-2 items-center'>
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={()=>setShowConfirmEndTrainingModal(true)} disabled={loading}>Zakończ trening</Button>
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={handleShowExerciseList} disabled={loading}>Zmień</Button>
                <span className='text-nowrap'>{currentExerciseIndex} z {totalExercises}</span>
            </div>
        </div>
        {
            loading ? <DisplayTrainingSkeleton isTraining={true}/> :
        <>
        <AddExerciseUsingState name={currentExerciseName} exerciseid={currentExerciseId} trainingState={localStorageTrainingData} isLoading={loading} showTimeMesure={showTimeMesure} isTraining={true} requiresHandle={requiresHandle} allHandles={allHandles} setLocalStorageTrainingData={setLocalStorageTrainingData}/>
        </>
        }
        {error && <div className='text-red'>{error}</div>}

            <div className='mx-5 text-white flex gap-4 mt-auto pt-4'>
                <Button className='flex-1' onClick={previousExercise}>LEWO</Button>
                <Button className='flex-1' onClick={()=>setShowConfirmEndTrainingModal(true)} isPrimary>ZAKOŃCZ TRENING</Button>
                <Button className='flex-1' onClick={nextExercise}>PRAWO</Button>
            </div>
        
        {modalsContext?.showExerciseList && 
        <ChangeExerciseList 
            list={trainingPlanData.exercises.exercises} 
            setCurrentExercise={setCurrentExerciseIndex} 
            />}
        
        {modalsContext?.showAddExerciseModal && 
        <MapExercises 
            setShowAddExercise={modalsContext?.setShowAddExerciseModal} 
            allExercisesInOneArray={allExercisesInOneArray} 
            exercisesObject={exercisesObject} 
            isTrainingInProgressPage={true} 
            setCurrentExercise={setCurrentExerciseIndex} 
            setTotalNumberOfTrainigs={setTotalExercies}
            setShowExerciseList={modalsContext?.setShowExerciseList}
            setPlanExercises={setLocalStorageTrainingData}

            />}
        {showConfirmEndTrainingModal && 
        <ConfirmEndTrainingModal 
            text='Czy napewno chcesz zakończyć trening?'
            showModal={setShowConfirmEndTrainingModal}
            handleEnd={handleCloseTraining}
            />}
    </div>)
}
