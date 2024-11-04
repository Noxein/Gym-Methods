'use client'
import { useState, useRef, useEffect } from 'react'
import { DifficultyLevelType , LocalStorageTraining, Side as SideType } from '@/app/types'
import { AddExerciseAction } from '@/app/actions'
import { usePathname } from 'next/navigation'
import { Icon } from '@/app/components/Icon'
import { CheckIcon, PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ShowHistoryButton } from '@/app/components/add-exercise/ShowHistoryButton'
import { PreviousExercise } from '@/app/components/home/start-training/PreviousExercise'
import { SmallLoaderDiv } from '@/app/components/ui/SmallLoaderDiv'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { Button } from '@/app/components/ui/Button'
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

export const AddExerciseUsingState = ({name,showTimeMesure,isTraining=false,isLoading = false,exerciseid,requiresHandle,trainingState,allHandles,setLocalStorageTrainingData}:AddExerciseUsingStateType) => {
    const[error,setError] = useState<string>('')
    const[loading,setLoading] = useState(false)
    const[showHistory,setShowHistory] = useState(false)
    const[checked,setChecked] = useState(false)

    const pathname = usePathname()

    const currentSeriesArray = trainingState.exercises[trainingState.currentExerciseIndex] && trainingState.exercises[trainingState.currentExerciseIndex].sets || []
    const currentSelectedHandle = trainingState.exercises[trainingState.currentExerciseIndex] && trainingState.exercises[trainingState.currentExerciseIndex].handle

    const FinishTraining = async () => {
        if(!checked) return
        setError('')
        setLoading(true)
        
        

        const possibleError = await AddExerciseAction(true,name,currentSeriesArray,pathname.includes('training'),'',currentSelectedHandle)
        if(possibleError) {
            setError(possibleError.errors)
            setLoading(false)
            return
        }
        setLoading(false)
    }
    const handleAddSeries = () => {
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            if(!xCopy.exercises[xCopy.currentExerciseIndex].date){
                xCopy.exercises[xCopy.currentExerciseIndex].date = new Date()
            }
            xCopy.exercises[xCopy.currentExerciseIndex].sets.push({
                difficulty: xCopy.inputData.difficulty,
                repeat: xCopy.inputData.repeat,
                side: xCopy.inputData.side,
                weight: xCopy.inputData.weight,
                time:  xCopy.inputData.time,
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
               <WeightAndRepeatInputs trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData}/>
               <DifficultyLevel showTimeMesure={showTimeMesure} trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData}/>
               <Side trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData}/>
               {requiresHandle && <Handle allHandles={allHandles} trainingState={trainingState} setLocalStorageTrainingData={setLocalStorageTrainingData}/>}
            </div>
            
            <ButtonWithIcon onClick={()=>handleAddSeries()} className={`mt-6 text-xl rounded-md py-4 flex items-center justify-between px-5 `} isPrimary disabled={isLoading || loading}
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
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory} loading={loading}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} />}

        <ErrorDiv error={error}/>
        
        {!isTraining && 
        <div className='flex w-full gap-2 mt-auto pt-4'>
            <button  className='w-16 h-16 rounded accent-dark border-marmur border-2' onClick={()=>setChecked(x=>!x)}> 
            {checked?
                <Icon className='flex justify-center'>
                    <CheckIcon fill='#fff' height='40' width='40'/>
                </Icon>:
                null   
                }
            </button>

            <Button onClick={FinishTraining} disabled={loading} isPrimary className='w-full text-xl'>
                {loading? <SmallLoaderDiv loading={loading}/> : 'Zakończ ćwiczenie'}
            </Button>
        </div>
        }
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
    trainingState: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}
const WeightAndRepeatInputs = ({trainingState,setLocalStorageTrainingData}:WeightAndRepeatInputsTypes) => {
    const handleChangeWeight = (payload:number) => {
        return setLocalStorageTrainingData(x=>{
            const xCopy = {...x}
            xCopy.inputData.weight = payload
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    const handleChangeRepeat = (payload:number) => {
        return setLocalStorageTrainingData(x=>{
            const xCopy = {...x}
            xCopy.inputData.repeat = payload
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    const weightInput = trainingState.inputData.weight
    const repeatInput = trainingState.inputData.repeat
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
    trainingState: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}
const DifficultyLevel = ({showTimeMesure,trainingState,setLocalStorageTrainingData}:DifficultyLevelTypes) => {
    const difficultyInput = trainingState.inputData.difficulty
    const timeInput = trainingState.inputData.time

    const handleDifficultyChgane = (payload:DifficultyLevelType) => {
        return setLocalStorageTrainingData(x=>{
            const xCopy = {...x}
            xCopy.inputData.difficulty = payload
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    const handleTimeChange = (payload:string) => {
        return setLocalStorageTrainingData(x=>{
            const xCopy = {...x}
            xCopy.inputData.time = payload
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
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
    trainingState: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}
const Side = ({trainingState,setLocalStorageTrainingData}:SideTypes) => {
    const handleChange = (payload:SideType) => {
        return setLocalStorageTrainingData(x=>{
            const xCopy = {...x}
            xCopy.inputData.side = payload
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    const sideInput = trainingState.inputData.side
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
    trainingState: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}

const Handle = ({allHandles,trainingState,setLocalStorageTrainingData}:HandleTypes) => {
    const handleInput = trainingState.exercises[trainingState.currentExerciseIndex].handle
    const handleChange = (id:string,name:string) => {
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