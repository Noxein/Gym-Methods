'use client'
import { ExercisesThatRequireTimeMesureOrHandle, ExerciseTypes, TrainingExerciseType, UserExercise, LocalStorageTraining, UserTrainingPlan } from '@/app/types'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { SaveTrainingToDatabase } from '@/app/actions'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'
import { ChangeExerciseList } from './ChangeExerciseList'
import { MapExercises } from '../../profile/my-training-plans/trainingPlanName/MapExercises'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ConfirmEndTrainingModal } from './ConfirmEndTrainingModal'
import { AddExerciseUsingState } from '@/app/components/home/start-training/AddExerciseUsingState'
import { localStorageSetter } from '@/app/lib/utils'
import { ExpandIcon, LeftAngle, RightTriangle } from '@/app/ui/icons/ExpandIcon'

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
            trainingStartDate: new Date(),
            trainingNameInLocalStrage: trainingName+'training'
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
    


    const[showConfirmEndTrainingModal,setShowConfirmEndTrainingModal] = useState(false)
    const[localStorageTrainingData,setLocalStorageTrainingData] = useState<LocalStorageTraining>(()=>initializeLocalStorageData(trainingPlanData.trainingname,trainingPlanData.exercises.exercises))
    const saveToLocalStorage = useRef(true)

    const currentExerciseName = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseName
    const currentExerciseId = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseId
    const totalExercises = localStorageTrainingData.exercises.length
    const localstorageTrainingName = trainingPlanData.trainingname+'training'

    const showTimeMesure = ExercisesThatRequireTimeMesure.some(exercise=>exercise.id === currentExerciseId)
    const requiresHandle = ExercisesThatRequireHandle.some(exercise=>exercise.id === currentExerciseId)

    const[error,setError] = useState('')

    const[loading,setLoading] = useState(false)
    const modalsContext = useContext(ModalContexts)
    
    const nextExercise = async () => {
        const length = localStorageTrainingData.exercises.length

        if(localStorageTrainingData.currentExerciseIndex === length - 1) return
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.currentExerciseIndex = xCopy.currentExerciseIndex + 1
            localStorageSetter(localstorageTrainingName,xCopy)
            return xCopy
        })
    }

    const previousExercise = async () => {
        if(localStorageTrainingData.currentExerciseIndex === 0) return
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.currentExerciseIndex = xCopy.currentExerciseIndex - 1
            localStorageSetter(localstorageTrainingName,xCopy)
            return xCopy
        })
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
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={handleShowExerciseList} disabled={loading}>Zmień</Button>
                <span className='text-nowrap'>{localStorageTrainingData.currentExerciseIndex + 1} z {totalExercises}</span>
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
                <Button className={`px-3 ${localStorageTrainingData.currentExerciseIndex===0 ? 'border-gray-700':null}`} onClick={previousExercise}>
                    <LeftAngle fill={localStorageTrainingData.currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
                </Button>
                <Button className='flex-1' onClick={()=>setShowConfirmEndTrainingModal(true)} isPrimary>ZAKOŃCZ TRENING</Button>
                <Button className={`px-3 ${localStorageTrainingData.currentExerciseIndex===totalExercises - 1 ? 'border-gray-700':null}`} onClick={nextExercise}>
                    <LeftAngle className='rotate-180' fill={localStorageTrainingData.currentExerciseIndex===totalExercises - 1 ? '#777':'#fff'} height='40' width='40'/>
                </Button>
            </div>
        
        {modalsContext?.showExerciseList && 
        <ChangeExerciseList 
            list2={localStorageTrainingData.exercises} 
            setLocalStorageTrainingData={setLocalStorageTrainingData}
            />}
        
        {modalsContext?.showAddExerciseModal && 
        <MapExercises 
            setShowAddExercise={modalsContext?.setShowAddExerciseModal} 
            allExercisesInOneArray={allExercisesInOneArray} 
            exercisesObject={exercisesObject} 
            isTrainingInProgressPage={true}
            setShowExerciseList={modalsContext?.setShowExerciseList}
            setLocalStorageTrainingData={setLocalStorageTrainingData}
            />}
        {showConfirmEndTrainingModal && 
        <ConfirmEndTrainingModal 
            text='Czy napewno chcesz zakończyć trening?'
            showModal={setShowConfirmEndTrainingModal}
            handleEnd={handleCloseTraining}
            />}
    </div>)
}
