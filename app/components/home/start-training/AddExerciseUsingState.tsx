'use client'
import { useState, useRef, useEffect } from 'react'
import { DifficultyLevelType , ExerciseType, LocalStorageTraining, Series, SeriesWithExercise, Side as SideType } from '@/app/types'
import { Icon } from '@/app/components/Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ShowHistoryButton } from '@/app/components/add-exercise/ShowHistoryButton'
import { PreviousExercise } from '@/app/components/home/start-training/PreviousExercise'
import { ButtonWithIcon } from '@/app/components/ui/ButtonWithIcon'
import { DisplayCurrentSeresUsingState } from './DisplayCurrentSeresUsingState'
import { localStorageSetter } from '@/app/lib/utils'

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
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}

const initializeInputsState = (exerciseid:string,requiresHandle: boolean, requiresTimeMesure: boolean) => {
    const data = localStorage.getItem(exerciseid)
    if(data){
        const parsedData = JSON.parse(data)
        return parsedData as SeriesWithExercise
    }
    let dataObject: SeriesWithExercise = {
        difficulty: 'easy',
        repeat: 0,
        side: 'Both',
        weight: 0,
        exerciseid,
    }
    if(requiresHandle) {
        dataObject.handle = {
            handleId: 'Sznur',
            handleName: 'Sznur'
        }
    }
    if(requiresTimeMesure){
        dataObject.time = ''
    }
    localStorage.setItem(exerciseid,JSON.stringify(dataObject))
    return dataObject
}
export const AddExerciseUsingState = ({name,showTimeMesure,isTraining=false,isLoading = false,exerciseid,requiresHandle,trainingState,allHandles,setLocalStorageTrainingData}:AddExerciseUsingStateType) => {
    const[showHistory,setShowHistory] = useState(false)
    const[historyCache,setHistoryCache] = useState<{[key:string]:ExerciseType | null}>()
    const[inputs,setInputs] = useState<SeriesWithExercise>(()=>initializeInputsState(exerciseid,requiresHandle,showTimeMesure))

    useEffect(()=>{
        setInputs(initializeInputsState(exerciseid,requiresHandle,showTimeMesure))
    },[name])

    const handleAddSeries = () => {
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            if(!xCopy.exercises[xCopy.currentExerciseIndex].date){
                xCopy.exercises[xCopy.currentExerciseIndex].date = new Date()
            }
            xCopy.exercises[xCopy.currentExerciseIndex].sets.push({
                difficulty: inputs.difficulty,
                repeat: inputs.repeat,
                side: inputs.side,
                weight: inputs.weight,
                time:  inputs.time,
            })
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
  return (
    <div className={`px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'}`}>
        <h1 className={`text-marmur text-xl text-center font-medium`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2 z-10`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs inputs={inputs} setInputs={setInputs}/>
               <DifficultyLevel showTimeMesure={showTimeMesure} inputs={inputs} setInputs={setInputs}/>
               <Side inputs={inputs} setInputs={setInputs}/>
               {requiresHandle && <Handle allHandles={allHandles} inputs={inputs} setInputs={setInputs} trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData} />}
            </div>
            
            <ButtonWithIcon onClick={()=>handleAddSeries()} className={`mt-6 text-xl rounded-md py-4 flex items-center justify-between px-5 `} isPrimary disabled={isLoading}
                buttonText='Dodaj serie'
                childrenIcon={
                    <Icon className='bg-opacity-0 flex'>
                    <PlusIcon /> 
                </Icon>
                }
                >

            </ButtonWithIcon>
            <div className='grid mt-3 text-white w-full'>
                <div className={` justify-around grid ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'} mr-10 -mb-2 pl-7 w-[100vw-28px] bg-dark`}>
                <div className='font-light'>Ciężar</div>
                <div className='font-light'>Powtórzenia</div>
                <div className='font-light'>Ciężkość</div>
            {showTimeMesure && <div className='font-light'>Czas</div>}
            </div>

        </div>
        </div>

        <DisplayCurrentSeresUsingState exercisename={name} trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData} isTraining={isTraining} showTimeMesure={showTimeMesure}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}

    </div>
    )
}

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    return(
        <input  className={` w-full text-marmur border-white bg-dark border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-blue-500`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
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
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>Ciężar</Label>
                <Input type="number" id='weight' onChange={e=>handleChangeWeight(Number(e.target.value))} value={weightInput} min={1}/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>Powtórzenia</Label>
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
            xCopy.time = payload
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
    }

    return(<div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark`}>Ciężkość serii</label>
            <select name="difficulty" id="difficulty" className={`bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10`} value={difficultyInput} onChange={e=>handleDifficultyChgane(e.target.value as DifficultyLevelType)}>
                <option value="easy">Łatwa</option>
                <option value="medium">Średnia</option>
                <option value="hard">Trudna</option>
            </select>
        </div>
        {showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>Czas</Label>
                <Input type="text" id='time' onChange={e=>handleTimeChange(e.target.value)} value={timeInput}/>
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
    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>Strona</label>
                <select name="side" value={sideInput} id="side" className='bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10' onChange={e=>handleChange(e.target.value as SideType)}>
                    <option value="Both">Obie</option>
                    <option value="Left">Lewa</option>
                    <option value="Right">Prawa</option>
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
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}

const Handle = ({allHandles,inputs,trainingState,setInputs,setLocalStorageTrainingData}:HandleTypes) => {
    const handleInput = trainingState.exercises[trainingState.currentExerciseIndex].handle
    
    const handleChange = (id:string,name:string) => {
        setInputs(x=>{
            let xCopy = {...x}
            xCopy.handle = { handleId: id, handleName: name}
            localStorageSetter(xCopy.exerciseid,xCopy)
            return xCopy
        })
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.exercises[xCopy.currentExerciseIndex].handle = {handleId: id, handleName: name}
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    useEffect(()=>{
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.exercises[xCopy.currentExerciseIndex].handle = {handleId: allHandles[0].id, handleName: allHandles[0].handlename}
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    },[])
    return (
    <div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>Uchwyt</label>
            <select name="handle" value={handleInput?.handleId} id="side" className='bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10' onChange={e=>handleChange(e.target.value,e.target.title)}>
                {allHandles.map(handle=>(
                    <option value={handle.id} title={handle.handlename} key={handle.id}>{handle.handlename}</option>
                ))}
            </select>
        </div>
    </div>
    )
}