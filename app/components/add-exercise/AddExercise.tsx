'use client'
import { useEffect, useState, useRef, useContext, useReducer } from 'react'
import { ActionTypes, AddExerciceReducerType, ExerciseType, HandleType, ProgressedIndexesType, Side as SideType, SingleExerciseLocalMemoryData } from '../../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../../actions'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '../Icon'
import { CheckIcon, PlusIcon, SwapIcon } from '@/app/ui/icons/ExpandIcon'
import { ShowHistoryButton } from './ShowHistoryButton'
import { PreviousExercise } from '../home/start-training/PreviousExercise'
import { SmallLoaderDiv } from '../ui/SmallLoaderDiv'
import { ErrorDiv } from '../ui/ErrorDiv'
import { Button } from '../ui/Button'
import { useTranslations } from 'next-intl'
import { getProgressedSeriesIndexes, nameTrimmer } from '@/app/lib/utils'
import { exercisesArr, handleTypes } from '@/app/lib/exercise-list'
import { Timer } from './Timer'
import { ButtonToAddSeriesExercise } from './ButtonToAddSeriesExercise'
import { ShowProgressionSingleExercise } from './ShowProgressionSingleExercise'
import { SingleExerciseProgressionContext } from '@/app/context/SingleExerciseProgressionContext'
import { ExerciseDataContext } from '@/app/context/ExerciseDataContext'
import { AddExerciceReducer } from '@/app/lib/reducers'
import { LoaderFullScreen } from '../Loading/LoaderFullScreen'
import SwapExerciseButton from './SwapButton'

type AddExerciseType = {
    isTraining?: boolean,
    // state: AddExerciceReducerType,
    // dispatch: React.Dispatch<ActionTypes>,
    isLoading?: boolean,
}


const initalData = (exerciseName:string) => {
  let init = {
    weight: 0,
    repeat: 0,
    side: 'Both',
    series:[],
    difficultyLevel: "easy",
    time: 0,
    handle: undefined,
  } as AddExerciceReducerType

  const data = localStorage.getItem(exerciseName+'singleExerciseChanged')
  if(!data){
    localStorage.setItem(exerciseName+'singleExerciseChanged',JSON.stringify(init))
    return init
  } 

  const parsedData = JSON.parse(data) as SingleExerciseLocalMemoryData
  init.difficultyLevel = parsedData.difficultyLevel
  init.repeat = parsedData.repeat
  init.side = parsedData.side
  init.time = parsedData.time
  init.weight = parsedData.weight
  init.series = parsedData.series ? parsedData.series : []
  init.handle = parsedData.handle ? parsedData.handle : undefined

  return init
}

const updateInputsInMemory = (state:AddExerciceReducerType,exerciseName: string,loading: boolean) => {
    if(loading) return
    localStorage.setItem(exerciseName+'singleExerciseChanged',JSON.stringify(state))
}

export const AddExercise = ({isTraining=false,isLoading = false}:AddExerciseType) => {

    const { exerciseData, progressions, newExerciseName, twoRecentExercises, firstLoad, loading, setLoading, finishOneExercise } = useContext(ExerciseDataContext)!

    const[state,dispatch] = useReducer<(state: AddExerciceReducerType, action: ActionTypes) => AddExerciceReducerType>(AddExerciceReducer,initalData(exerciseData.name))
    const[error,setError] = useState<string>('')
    //const[loading,setLoading] = useState(false)
    const[showHistory,setShowHistory] = useState(false)
    const[checked,setChecked] = useState(false)
    const[historyCache,setHistoryCache] = useState<{[key:string]:ExerciseType | null}>()

    const pathname = usePathname()
    const router = useRouter()


    const {setSeriesIndexesThatMetGoal} = useContext(SingleExerciseProgressionContext)!

        useEffect(()=>{
        const data = localStorage.getItem(exerciseData.name+'singleExerciseChanged') 
        const parsedData = data ? JSON.parse(data) as SingleExerciseLocalMemoryData : null

        if(parsedData){
            dispatch({type:'WEIGHT',payload:parsedData.weight})
            dispatch({type:'REPEAT',payload:parsedData.repeat})
            dispatch({type:'SIDE',payload:parsedData.side})
            dispatch({type:'DIFFICULTY',payload:parsedData.difficultyLevel})
            dispatch({type:'TIME',payload:parsedData.time})
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData.series})
            dispatch({type:"HANDLE", payload: parsedData.handle ? {id: parsedData.handle.id, handlename: parsedData.handle.handlename} as HandleType : undefined})

            const progression = progressions[exerciseData.name]
            let indexes:ProgressedIndexesType = getProgressedSeriesIndexes(parsedData.series,progression)
            setSeriesIndexesThatMetGoal(indexes)
        }
    },[])

    const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
    const u = useTranslations("Utils")
    const d = useTranslations("DefaultExercises")
    const e = useTranslations("Errors")

    if(firstLoad){
        return(
            <div className='flex justify-center items-center h-[100dvh]'>)
                <LoaderFullScreen />
            </div>
        )
    }




    
    updateInputsInMemory(state,exerciseData.name,loading)


    const FinishExercise = async () => {
        if(!checked) return
        setError('')
        setLoading(true)
        
        const progression = progressions[exerciseData.name]
        const possibleError = await AddExerciseAction(false,exerciseData.name,state.series,pathname.includes('training'),'',exerciseData.requiresHandle?{handleId:state.handle?.id!,handleName:state.handle?.handlename!}:undefined,undefined,undefined,undefined,progression)
        
        setLoading(false)

        if(possibleError) {
            setError(e(possibleError.errors))
            return
        }

        await finishOneExercise()
        if(twoRecentExercises.length <= 1) return
        await swapExercise()
        setChecked(false)
    }

    const exerciseName = exercisesArr.includes(exerciseData.name) ? d(nameTrimmer(exerciseData.name)) : exerciseData.name

    const swapExercise = async () => {
        const data = localStorage.getItem(newExerciseName+'singleExerciseChanged')
        const parsedData = data ? JSON.parse(data) as SingleExerciseLocalMemoryData : null

        if(parsedData){
            dispatch({type:"HANDLE", payload: parsedData.handle ? {id: parsedData.handle.id, handlename: parsedData.handle.handlename} as HandleType : undefined})
            dispatch({type:'WEIGHT',payload:parsedData.weight})
            dispatch({type:'REPEAT',payload:parsedData.repeat})
            dispatch({type:'SIDE',payload:parsedData.side})
            dispatch({type:'DIFFICULTY',payload:parsedData.difficultyLevel})
            dispatch({type:'TIME',payload:parsedData.time})
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData.series})
        }
        

    }

  return (
    <div className={`px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'}`}>
        <div className='relative'>
            <h1 className={`text-marmur text-xl text-center font-medium`}>{loading? '...' : exerciseName}</h1>

            {twoRecentExercises.length > 1 && <SwapExerciseButton dispatch={dispatch} state={state}/>}

        </div>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2 z-10`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs dispach={dispatch} state={state}/>
               <DifficultyLevel dispach={dispatch} state={state}/>
               <Side dispatch={dispatch} state={state} />
               {exerciseData.requiresHandle && <Handle dispatch={dispatch} state={state}/>}
            </div>
            <Timer />

            <ButtonToAddSeriesExercise
                dispatch={dispatch}
                isLoading={isLoading}
                loading={loading}
                state={state}
            />
            <div className='grid mt-3 text-white w-full'>
                <div className={` justify-around grid ${exerciseData.showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'} mr-10 -mb-2 pl-7 w-[100vw-28px] bg-dark`}>
                <div className='font-light'>{u("Weight")}</div>
                <div className='font-light'>{u("Repeat")}</div>
                <div className='font-light'>{u("Difficulty")}</div>
            {exerciseData.showTimeMesure && <div className='font-light'>{u("Time")}</div>}
            </div>

        </div>
        </div>

        <DisplayCurrentSeries currentSeries={state.series} dispatchSeries={dispatch} isTraining={isTraining}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory} loading={loading}/>
        {showHistory && <PreviousExercise exerciseid={exerciseData.exerciseid} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}

        <ShowProgressionSingleExercise 
            state={state}
            dispatch={dispatch}
        />

        <ErrorDiv error={error}/>
        
   
        <div className='flex w-full gap-2 mt-auto pt-4'>
            <button  className='w-16 h-16 rounded accent-dark border-borderInteractive border-2' onClick={()=>setChecked(x=>!x)}> 
            {checked?
                <Icon className='flex justify-center'>
                    <CheckIcon fill='#fff' height='40' width='40'/>
                </Icon>:
                null   
                }
            </button>

            <Button onClick={FinishExercise} disabled={loading} isPrimary className='w-full text-xl'>
                {loading? <SmallLoaderDiv loading={loading}/> : t("FinishExercise")}
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
        <input  className={` w-full text-marmur border-borderInteractive bg-dark border-2 min-h-10 text-lg rounded-lg pl-4`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
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
    const u = useTranslations("Utils")

    const { loading } = useContext(ExerciseDataContext)!

    const weightChange = (value: string) => {
        dispach({type:"WEIGHT",payload:Number(value)})
    }
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>{u("Weight")}</Label>
                {
                loading ? 
                <Input type="text" disabled id='weight' value={'...'}/> 
                :
                <Input type="number" id='weight' onChange={e=>weightChange(e.target.value)} value={state.weight} min={1}/>
                }
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>{u("Repeat")}</Label>

                {
                loading ? 
                <Input type="text" disabled id='weight' value={'...'}/> 
                :
                <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
                }
            </div>
        </div>
    )
}

const DifficultyLevel = ({dispach,state}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType}) => {

    const { exerciseData, loading } = useContext(ExerciseDataContext)!

    const u = useTranslations("Utils")
    return(<div className='flex gap-2'>
        {loading?
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark z-10`} >{u("Difficulty")}</label>
            <select disabled className={`bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10`}>
                <option value="easy">...</option>
            </select>
        </div>:
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark`} >{u("Difficulty")}</label>
            <select name="difficulty" id="difficulty" disabled={loading} className={`bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10`} value={state.difficultyLevel} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
                <option value="easy">{u("Easy")}</option>
                <option value="medium">{u("Medium")}</option>
                <option value="hard">{u("Hard")}</option>
            </select>
        </div>

    }

        {exerciseData.showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>{u("TimeInSeconds")}</Label>
                {
                loading ? 
                <Input type="text" disabled id='weight' value={'...'}/> 
                :
                <Input type="number" id='time' disabled={loading} onChange={e=>dispach({type:"TIME",payload:Number(e.target.value)})} value={state.time}/>
                }
                
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

    const { loading } = useContext(ExerciseDataContext)!

    const u = useTranslations("Utils")

    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark z-10'>{u("Side")}</label>
                {loading ? 
                <select disabled className='bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10'>
                    <option>...</option>
                </select>
                :
                <select name="side" value={state.side} id="side" disabled={loading} className='bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' onChange={e=>handleChange(e.target.value)}>
                    <option value="Both">{u("Both")}</option>
                    <option value="Left">{u("Left")}</option>
                    <option value="Right">{u("Right")}</option>
                </select>
                }

            </div>
        </div>
    )
}

type HandleTypes = {
    state: AddExerciceReducerType,
    dispatch: React.Dispatch<ActionTypes>,
}

const Handle = ({dispatch,state}:HandleTypes) => {
    const handleChange = (obj:{id:string,handlename:string}) => {
        dispatch({type:"HANDLE", payload:{id: obj.id, handlename: obj.handlename} as HandleType})
    }

    const { allHandles, exerciseData } = useContext(ExerciseDataContext)!

    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    const selectedHandle = exerciseData.requiresHandle && state.handle ? {id: state.handle.id, handlename: state.handle.handlename} : allHandles[0]
    console.log('selected handle', selectedHandle)
    return (
    <div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>{u("Handle")}</label>
            <select name="handle" id="side" className='bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' onChange={e=>handleChange(JSON.parse(e.target.value) as {id:string, handlename: string})} >
                {allHandles.map(handle=>{
                    const name = handleTypes.includes(handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                    return <option value={JSON.stringify(handle)} key={handle.id} selected={name===selectedHandle.handlename}>{name}</option>
                })}
            </select>
        </div>
    </div>
    )
}