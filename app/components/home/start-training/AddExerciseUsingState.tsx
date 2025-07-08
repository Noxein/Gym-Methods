'use client'
import { useState, useRef, useEffect, useContext } from 'react'
import { DifficultyLevelType , ExerciseType, LocalStorageTraining, Progression, SeriesWithExercise, Side as SideType, UserTrainingPlan } from '@/app/types'
import { Icon } from '@/app/components/Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ShowHistoryButton } from '@/app/components/add-exercise/ShowHistoryButton'
import { PreviousExercise } from '@/app/components/home/start-training/PreviousExercise'
import { ButtonWithIcon } from '@/app/components/ui/ButtonWithIcon'
import { DisplayCurrentSeresUsingState } from './DisplayCurrentSeresUsingState'
import { initializeInputsState, localStorageSetter, nameTrimmer } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'
import { exercisesArr, handleTypes } from '@/app/lib/exercise-list'
import { v4 } from 'uuid'
import { ModalContexts } from './ModalContexts'
import { ShowProgression } from './ShowProgression'
import { Timer } from '../../add-exercise/Timer'
import { TimerContext } from '@/app/context/TimerContext'
import { ButtonToAddSeries } from './ButtonToAddSeries'

type AddExerciseUsingStateType = {
    name:string,
    showTimeMesure:boolean,
    isTraining?: boolean,
    isLoading?: boolean,
    exerciseid: string,
    requiresHandle: boolean,
    trainingState: LocalStorageTraining,
    allHandles: {
        id: string;
        handlename: string;
    }[],
    localStorageTrainingData: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
    useremail:string,
    setProgressedIndexes: (index:number,localStorageTrainingData:LocalStorageTraining) => void,
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
    trainingPlan: UserTrainingPlan;
    goal?: Progression,
}

export const AddExerciseUsingState = ({name,showTimeMesure,isTraining=false,isLoading = false,exerciseid,requiresHandle,trainingState,allHandles,localStorageTrainingData,setLocalStorageTrainingData,useremail,setProgressedIndexes,inputs,setInputs,trainingPlan,goal}:AddExerciseUsingStateType) => {
    const[showHistory,setShowHistory] = useState(false)
    const[historyCache,setHistoryCache] = useState<{[key:string]:ExerciseType | null}>()
    
    useEffect(()=>{
        setInputs(initializeInputsState(exerciseid,requiresHandle,showTimeMesure,useremail))
    },[name])
    
    const d = useTranslations("DefaultExercises")
    const t = useTranslations("Home/Start-Training/[TrainingName]")
    const u = useTranslations("Utils")

    const formattedName = exercisesArr.includes(name) ? d(nameTrimmer(name)) : name

  return (
    <div className={ `px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'} ` }>

        <h1 className={`text-marmur text-xl text-center font-medium`}> 
            {formattedName} 
        </h1>

        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2 z-10`} >

            <div className='flex flex-col gap-6' >
               <WeightAndRepeatInputs inputs={inputs} setInputs={setInputs}/>
               <DifficultyLevel showTimeMesure={showTimeMesure} inputs={inputs} setInputs={setInputs} />
               <Side inputs={inputs} setInputs={setInputs} />
               {requiresHandle && <Handle allHandles={allHandles} inputs={inputs} setInputs={setInputs} trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData} localStorageTrainingData={localStorageTrainingData}/>}
            </div>
            
            <Timer />
            
            <ButtonToAddSeries 
                localStorageTrainingData={localStorageTrainingData} 
                inputs={inputs} 
                setProgressedIndexes={setProgressedIndexes} 
                setLocalStorageTrainingData={setLocalStorageTrainingData}
                isLoading={isLoading}
                />

            <div className='grid mt-3 text-white w-full'>
                <div className={`justify-around grid ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'} mr-10 -mb-2 pl-7 w-[100vw-28px] bg-dark`} >
                <div className='font-light'>{u("Weight")} </div>
                <div className='font-light'>{u("Repeat")} </div>
                <div className='font-light'>{u("Difficulty")} </div>
            {showTimeMesure && <div className='font-light'>{u("Time")} </div>}
            </div>

        </div>
        </div>

        <DisplayCurrentSeresUsingState trainingState={trainingState} localStorageTrainingData={localStorageTrainingData} setLocalStorageTrainingData={setLocalStorageTrainingData} showTimeMesure={showTimeMesure} setProgressedIndexes={setProgressedIndexes}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}
        
        <ShowProgression 
            trainingPlan={trainingPlan}
            currentExercise={name}
            inputs={inputs}
            setInputs={setInputs}
            goal={goal}
        />
    </div>
    )
}

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    return(
        <input  className={` w-full text-marmur border-borderInteractive bg-dark border-[2px] min-h-10 text-lg rounded-lg pl-4`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {

    return(
        <label htmlFor=""  className={`text-marmur font-light absolute -top-1/3 left-2 bg-dark px-2 ${sClass}`} {...rest}></label>
    )
}

type WeightAndRepeatInputsTypes = {
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
}
const WeightAndRepeatInputs = ({inputs,setInputs}:WeightAndRepeatInputsTypes) => {
    const handleChangeWeight = (payload:number) => {
        return setInputs(x=>{
            let xCopy = {...x}
            xCopy.weight = payload
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }
    const handleChangeRepeat = (payload:number) => {
        return setInputs(x=>{
            let xCopy = {...x}
            xCopy.repeat = payload
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }
    const weightInput = inputs.weight
    const repeatInput = inputs.repeat

    const u = useTranslations("Utils")
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>{u("Weight")}</Label>
                <Input type="number" id='weight' onChange={e=>handleChangeWeight(Number(e.target.value))} value={weightInput} min={1}/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>{u("Repeat")}</Label>
                <Input type="number" id='repeat' onChange={e=>handleChangeRepeat(Number(e.target.value))} value={repeatInput} min={1}/>
            </div>
        </div>
    )
}

type DifficultyLevelTypes = {
    showTimeMesure: boolean,
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
}
const DifficultyLevel = ({showTimeMesure,inputs,setInputs}:DifficultyLevelTypes) => {
    const difficultyInput = inputs.difficulty
    const timeInput = inputs.time

    const handleDifficultyChgane = (payload:DifficultyLevelType) => {
        return setInputs(x=>{
            let xCopy = {...x}
            xCopy.difficulty = payload
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }
    const handleTimeChange = (payload:string) => {
        return setInputs(x=>{
            let xCopy = {...x}
            xCopy.time = Number(payload)
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }

    const u = useTranslations("Utils")

    return(<div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark`}> {u("Difficulty")} </label>
            <select name="difficulty" id="difficulty" className={`bg-dark pl-3 text-marmur border-borderInteractive border-[2px] rounded-md h-10`} value={difficultyInput} onChange={e=>handleDifficultyChgane(e.target.value as DifficultyLevelType)}>
                <option value="easy">{u("Easy")}</option>
                <option value="medium">{u("Medium")}</option>
                <option value="hard">{u("Hard")}</option>
            </select>
        </div>
        {showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>{u("Time")}</Label>
                <Input type="number" id='time' onChange={e=>handleTimeChange(e.target.value)} value={timeInput}/>
            </div>}
        </div>)
}

type SideTypes = {
    inputs: SeriesWithExercise,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
}
const Side = ({inputs,setInputs}:SideTypes) => {
    const handleChange = (payload:SideType) => {
        return setInputs(x=>{
            let xCopy = {...x}
            xCopy.side = payload
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }
    const sideInput = inputs.side

    const u = useTranslations("Utils")
    
    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>{u("Side")}</label>
                <select name="side" value={sideInput} id="side" className='bg-dark pl-3 text-marmur border-borderInteractive border-[2px] rounded-md h-10' onChange={e=>handleChange(e.target.value as SideType)}>
                    <option value="Both">{u("Both")}</option>
                    <option value="Left">{u("Left")}</option>
                    <option value="Right">{u("Right")}</option>
                </select>
            </div>
        </div>
    )
}

type HandleTypes = {
    allHandles: {
        id: string;
        handlename: string;
    }[],
    inputs: SeriesWithExercise,
    trainingState: LocalStorageTraining,
    setInputs: React.Dispatch<React.SetStateAction<SeriesWithExercise>>,
    localStorageTrainingData: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}

const Handle = ({allHandles,inputs,trainingState,setInputs,localStorageTrainingData,setLocalStorageTrainingData}:HandleTypes) => {
    const handleInput = trainingState.exercises[trainingState.currentExerciseIndex].handle
    const jsomHandleValue = JSON.stringify({id: handleInput?.handleId, handlename: handleInput?.handleName})
    
    const handleChange = (handle:{id:string,handlename:string}) => {
        setInputs(x=>{
            let xCopy = {...x}
            xCopy.handle = { handleId: handle.id, handleName: handle.handlename}
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })

        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].handle = {handleId: handle.id, handleName: handle.handlename}
        localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
    }
    useEffect(()=>{
        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        if(localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].handle) return setLocalStorageTrainingData(localStorageTrainingDataCopy)
        localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].handle = {handleId: allHandles[0].id, handleName: allHandles[0].handlename}
        localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
    },[])

    const h = useTranslations("Handles")
    return (
    <div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>Uchwyt</label>
            <select name="handle" value={jsomHandleValue} id="side" className='bg-dark pl-3 text-marmur border-borderInteractive border-[2px] rounded-md h-10' onChange={e=>handleChange(JSON.parse(e.target.value))}>
                {allHandles.map(handle=>{
                    const formattedHandleName = handleTypes.some(pre=> pre === handle.handlename) ? h(handle.handlename.replaceAll(" ",'')) : handle.handlename
                    return <option value={JSON.stringify(handle)} key={handle.id}>{formattedHandleName}</option>
                })}
            </select>
        </div>
    </div>
    )
}