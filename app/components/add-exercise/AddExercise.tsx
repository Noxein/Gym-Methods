'use client'
import { useEffect, useState, useRef } from 'react'
import { ActionTypes, AddExerciceReducerType, ExerciseType, Side as SideType } from '../../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../../actions'
import { usePathname } from 'next/navigation'
import { Icon } from '../Icon'
import { CheckIcon, PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ShowHistoryButton } from './ShowHistoryButton'
import { PreviousExercise } from '../home/start-training/PreviousExercise'
import { SmallLoaderDiv } from '../ui/SmallLoaderDiv'
import { ErrorDiv } from '../ui/ErrorDiv'
import { Button } from '../ui/Button'
import { ButtonWithIcon } from '../ui/ButtonWithIcon'

type AddExerciseType = {
    name:string,
    showTimeMesure:boolean,
    isTraining?: boolean,
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
    isLoading?: boolean,
    exerciseid: string,
    requiresHandle: boolean,
    allHandles: {
        id: string;
        handlename: string;
    }[],
}

export const AddExercise = ({name,showTimeMesure,isTraining=false,state,dispatch,isLoading = false,exerciseid,requiresHandle,allHandles}:AddExerciseType) => {
    const[error,setError] = useState<string>('')
    const[loading,setLoading] = useState(false)
    const[showHistory,setShowHistory] = useState(false)
    const[handle,setHandle] = useState<{handleName:string,handleId:string}>(requiresHandle?{handleId: allHandles[0].id,handleName: allHandles[0].handlename}: {handleId: '', handleName:''})
    const[checked,setChecked] = useState(false)
    const[historyCache,setHistoryCache] = useState<{[key:string]:ExerciseType | null}>()

    const pathname = usePathname()

    useEffect(()=>{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData})
        }
    },[name])
    const AddSeries = () => {
        dispatch({type:'ADDSERIES'})
        localStorage.setItem(name,JSON.stringify([...state.series,{
            weight: state.weight,
            repeat: state.repeat,
            time: state.time,
            side: state.side,
            difficulty: state.difficultyLevel,
        }]))
    }
    const ResetLocalStorage = () => {
        localStorage.removeItem(name)
    }
    const FinishTraining = async () => {
        if(!checked) return
        setError('')
        setLoading(true)
        

        const possibleError = await AddExerciseAction(true,name,state.series,pathname.includes('training'),'',handle)
        if(possibleError) {
            setError(possibleError.errors)
            setLoading(false)
            return
        }
        ResetLocalStorage()
        setLoading(false)
    }
  return (
    <div className={`px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'}`}>
        <h1 className={`text-marmur text-xl text-center font-medium`}>{name}</h1>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2 z-10`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs dispach={dispatch} state={state}/>
               <DifficultyLevel dispach={dispatch} state={state} showTimeMesure={showTimeMesure}/>
               <Side dispatch={dispatch} state={state} />
               {requiresHandle && <Handle handle={handle} setHandle={setHandle} allHandles={allHandles}/>}
            </div>
            
            <ButtonWithIcon onClick={e=>{e.preventDefault();AddSeries()}} className={`mt-6 text-xl rounded-md py-4 flex items-center justify-between px-5 `} isPrimary disabled={isLoading || loading}
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

        <DisplayCurrentSeries exercisename={name} currentSeries={state.series} dispatchSeries={dispatch} isTraining={isTraining} showTimeMesure={showTimeMesure}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory} loading={loading}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}

        <ErrorDiv error={error}/>
        
   
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

const WeightAndRepeatInputs = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>Ciężar</Label>
                <Input type="number" id='weight' onChange={e=>dispach({type:"WEIGHT",payload:Number(e.target.value)})} value={state.weight} min={1}/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>Powtórzenia</Label>
                <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
            </div>
        </div>
    )
}

const DifficultyLevel = ({dispach,state,showTimeMesure}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType,showTimeMesure:boolean}) => {
    return(<div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark`}>Ciężkość serii</label>
            <select name="difficulty" id="difficulty" className={`bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10`} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
                <option value="easy">Łatwa</option>
                <option value="medium">Średnia</option>
                <option value="hard">Trudna</option>
            </select>
        </div>
        {showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>Czas</Label>
                <Input type="text" id='time' onChange={e=>dispach({type:"TIME",payload:e.target.value})} value={state.time}/>
            </div>}
        </div>)
}

type SideTypes = {
    dispatch:React.Dispatch<ActionTypes>,
    state:AddExerciceReducerType,
}
const Side = ({dispatch,state}:SideTypes) => {
    const handleChange = (payload:string) => {
        dispatch({type:"SIDE",payload:payload as SideType})
    }
    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>Strona</label>
                <select name="side" value={state.side} id="side" className='bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10' onChange={e=>handleChange(e.target.value)}>
                    <option value="Both">Obie</option>
                    <option value="Left">Lewa</option>
                    <option value="Right">Prawa</option>
                </select>
            </div>
        </div>
    )
}

type HandleTypes = {
    handle: {
        handleName: string,
        handleId: string,
    },
    setHandle: React.Dispatch<React.SetStateAction<
    {
        handleName: string,
        handleId: string,
    }>>,
    allHandles: {
        id: string;
        handlename: string;
    }[]
}

const Handle = ({handle,setHandle,allHandles}:HandleTypes) => {
    const handleChange = (obj:{id:string,handlename:string}) => {
        setHandle({handleId: obj.id, handleName: obj.handlename})
    }
    return (
    <div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>Uchwyt</label>
            <select name="handle" id="side" className='bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10' onChange={e=>handleChange(JSON.parse(e.target.value) as {id:string, handlename: string})}>
                {allHandles.map(handle=>(
                    <option value={JSON.stringify(handle)} key={handle.id}>{handle.handlename}</option>
                ))}
            </select>
        </div>
    </div>
    )
}