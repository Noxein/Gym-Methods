'use client'
import { ExercisesThatRequireTimeMesureOrHandle, ExerciseTypes, UserExercise, LocalStorageTraining, UserTrainingPlan, LocalStorageExercise, TrainingProgression, SeriesWithExercise, ProgressedIndexesType, Progression } from '@/app/types'
import { useContext, useState } from 'react'
import { SaveTrainingToDatabase } from '@/app/actions'
import { DisplayTrainingSkeleton } from '../../Loading/home/start-training/trainingName/DisplayTrainingSkeleton'
import { ChangeExerciseList } from './ChangeExerciseList'
import { MapExercises } from '../../profile/my-training-plans/trainingPlanName/MapExercises'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ConfirmEndTrainingModal } from './ConfirmEndTrainingModal'
import { AddExerciseUsingState } from '@/app/components/home/start-training/AddExerciseUsingState'
import { getProgressedSeriesIndexes, HideShowHTMLScrollbar, initializeInputsState, localStorageSetter } from '@/app/lib/utils'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
    useremail?: string | null,
    progressions: Progression[]
}


export const DisplayTraining = ({trainingPlanData,exercisesObject,allExercisesInOneArray,allHandles,ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure,useremail,progressions}:DisplayTrainingTypes) => {
    const modalsContext = useContext(ModalContexts)

    const setProgressedIndexes = (index:number,localStorageTrainingDataArg:LocalStorageTraining) => {
        //const goal = trainingPlanData.exercises.find(x=>x.exercisename === localStorageTrainingDataArg.exercises[index].exerciseName)
        const goal = progressions.find(x=>x.exercisename === localStorageTrainingDataArg.exercises[index].exerciseName)
        let indexes:ProgressedIndexesType = getProgressedSeriesIndexes(localStorageTrainingDataArg.exercises[index].sets,goal)
        
        modalsContext?.setSeriesIndexesThatMetGoal(indexes)
    }
    
    const initializeLocalStorageData = (trainingName:string,exercises:TrainingProgression[],trainingid:string) => {
        const data = localStorage.getItem(trainingName+'training'+useremail)
        if(data){
            const parsedData = JSON.parse(data) as LocalStorageTraining
            setProgressedIndexes(parsedData.currentExerciseIndex,parsedData)
            return parsedData
        }
    
        let objectToSaveToLocalStorage:LocalStorageTraining = {
            currentExerciseIndex: 0,
            exercises:[],
            trainingStartDate: new Date(),
            trainingNameInLocalStrage: trainingName+'training'+useremail,
            trainingId: trainingid
            }
    
            exercises.map(exercise=>{
                let exerciseObj:LocalStorageExercise = {
                    id: exercise.id,
                    exerciseId: exercise.exerciseid,
                    exerciseName: exercise.exercisename,
                    sets: [],
                }

                if(ExercisesThatRequireHandle.some((name)=>name.id === exercise.exerciseid)){
                    exerciseObj.handle = {handleId: '', handleName: ''}
                }

                objectToSaveToLocalStorage.exercises.push(exerciseObj)
            })
            localStorage.setItem(trainingName+'training'+useremail,JSON.stringify(objectToSaveToLocalStorage))
            setProgressedIndexes(0,objectToSaveToLocalStorage)
        return objectToSaveToLocalStorage
    }

    const[showConfirmEndTrainingModal,setShowConfirmEndTrainingModal] = useState(false)
    const[localStorageTrainingData,setLocalStorageTrainingData] = useState<LocalStorageTraining>(()=>initializeLocalStorageData(trainingPlanData.trainingname,trainingPlanData.exercises,trainingPlanData.id))

    const goal = progressions.find(x=>x.exerciseid === localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseId)
    const currentExerciseName = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseName
    const currentExerciseId = localStorageTrainingData.exercises[localStorageTrainingData.currentExerciseIndex].exerciseId
    const totalExercises = localStorageTrainingData.exercises.length
    const localstorageTrainingName = trainingPlanData.trainingname+'training'+useremail

    const showTimeMesure = ExercisesThatRequireTimeMesure.some(exercise=>exercise.id === currentExerciseId)
    const requiresHandle = ExercisesThatRequireHandle.some(exercise=>exercise.id === currentExerciseId)

    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)
    const[inputs,setInputs] = useState<SeriesWithExercise>(()=>initializeInputsState(currentExerciseId,requiresHandle,showTimeMesure,useremail!))
    
    const router = useRouter()


    const nextExercise = async () => {
        const length = localStorageTrainingData.exercises.length

        if(localStorageTrainingData.currentExerciseIndex === length - 1) return

        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        localStorageTrainingDataCopy.currentExerciseIndex = localStorageTrainingDataCopy.currentExerciseIndex + 1
        localStorageSetter(localstorageTrainingName,localStorageTrainingDataCopy)
        
        

        setProgressedIndexes(localStorageTrainingDataCopy.currentExerciseIndex,localStorageTrainingData)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
    }

    const previousExercise = async () => {
        if(localStorageTrainingData.currentExerciseIndex === 0) return

        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        localStorageTrainingDataCopy.currentExerciseIndex = localStorageTrainingDataCopy.currentExerciseIndex - 1
        localStorageSetter(localstorageTrainingName,localStorageTrainingDataCopy)

        setProgressedIndexes(localStorageTrainingDataCopy.currentExerciseIndex,localStorageTrainingData)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
    }

    const handleCloseTraining = async () => {
        setLoading(true)
        const data = await SaveTrainingToDatabase(trainingPlanData.id,localStorageTrainingData.exercises,localStorageTrainingData.trainingStartDate,progressions)
        if(data && data.error){
            setLoading(false)
            return setError(data.error)
        }
        localStorage.removeItem(trainingPlanData.trainingname+'training'+useremail)
        setLoading(false)
        router.push('/home')
    }

    const handleShowExerciseList = () => {
        modalsContext?.setShowExerciseList(true)
    }
    const handleShowProgressionList = () => {
        HideShowHTMLScrollbar('hide')
        modalsContext?.setShowPlanProgressionModal(true)
    }
    const u = useTranslations("Utils")
    const t = useTranslations("Home/Start-Training/[TrainingName]")

  return (
    <div className='flex flex-col min-h-[calc(100dvh-100px)] mb-24'>
        <div className='text-white flex justify-between mt-2 mx-4 items-center'>
            <div>
                <h1 className='text-2xl'>{trainingPlanData.trainingname}</h1>
            </div>
            <div className='text-gray-400 flex gap-2 items-center'>
                <Button className='py-0 px-2 border-0 rounded' isPrimary onClick={handleShowExerciseList} disabled={loading}>{u("Change")}</Button>
                <span className='text-nowrap'>{localStorageTrainingData.currentExerciseIndex + 1} {u("Of")} {totalExercises}</span>
            </div>
        </div>
        {
            loading ? <DisplayTrainingSkeleton isTraining={true}/> :
            <AddExerciseUsingState 
                name={currentExerciseName} 
                exerciseid={currentExerciseId} 
                trainingState={localStorageTrainingData} 
                isLoading={loading} 
                showTimeMesure={showTimeMesure} 
                isTraining={true} 
                requiresHandle={requiresHandle} 
                allHandles={allHandles} 
                setLocalStorageTrainingData={setLocalStorageTrainingData} 
                useremail={useremail!}
                localStorageTrainingData={localStorageTrainingData}
                setProgressedIndexes={setProgressedIndexes}
                inputs={inputs}
                setInputs={setInputs}
                trainingPlan={trainingPlanData}
                goal={goal}
            />
        }
        {error && <div className='text-red'>{error}</div>}

            <div className='mx-5 text-white flex gap-4 mt-auto pt-4'>
                <Button className={`px-3 ${localStorageTrainingData.currentExerciseIndex===0 ? 'border-gray-700':null}`} onClick={previousExercise}>
                    <LeftAngle fill={localStorageTrainingData.currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
                </Button>
                <Button className='flex-1' onClick={()=>setShowConfirmEndTrainingModal(true)} isPrimary> {t("CloseTraining")} </Button>
                <Button className={`px-3 ${localStorageTrainingData.currentExerciseIndex===totalExercises - 1 ? 'border-gray-700':null}`} onClick={nextExercise}>
                    <LeftAngle className='rotate-180' fill={localStorageTrainingData.currentExerciseIndex===totalExercises - 1 ? '#777':'#fff'} height='40' width='40'/>
                </Button>
            </div>
        
        {modalsContext?.showExerciseList && 
            <ChangeExerciseList 
                list2={localStorageTrainingData.exercises} 
                setLocalStorageTrainingData={setLocalStorageTrainingData}
                setProgressedIndexes={setProgressedIndexes}
                localStorageTrainingData={localStorageTrainingData}
            />}
        
        {modalsContext?.showAddExerciseModal && 
            <MapExercises 
                setShowAddExercise={modalsContext?.setShowAddExerciseModal} 
                allExercisesInOneArray={allExercisesInOneArray} 
                exercisesObject={exercisesObject} 
                isTrainingInProgressPage={true}
                setShowExerciseList={modalsContext?.setShowExerciseList}
                localStorageTrainingData={localStorageTrainingData}
                setLocalStorageTrainingData={setLocalStorageTrainingData}
            />}

        {showConfirmEndTrainingModal && 
            <ConfirmEndTrainingModal 
                text={t("AreYouSure")}
                showModal={setShowConfirmEndTrainingModal}
                handleEnd={handleCloseTraining}
            />}

    </div>)
}
