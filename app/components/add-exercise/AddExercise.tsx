'use client'
import { useEffect, useState, useRef, useContext } from 'react'
import { ActionTypes, AddExerciceReducerType, ExerciseType, ProgressedIndexesType, Progression, Side as SideType } from '../../types'
import { DisplayCurrentSeries } from './DisplayCurrentSeries'
import { AddExerciseAction } from '../../actions'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '../Icon'
import { CheckIcon, PlusIcon } from '@/app/ui/icons/ExpandIcon'
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
    exerciseProgression?: Progression,
}

export const AddExercise = ({name,showTimeMesure,isTraining=false,state,dispatch,isLoading = false,exerciseid,requiresHandle,allHandles,exerciseProgression}:AddExerciseType) => {
    const[error,setError] = useState<string>('')
    const[loading,setLoading] = useState(false)
    const[showHistory,setShowHistory] = useState(false)
    const[handle,setHandle] = useState<{handleName:string,handleId:string}>(requiresHandle?{handleId: allHandles[0].id,handleName: allHandles[0].handlename}: {handleId: '', handleName:''})
    const[checked,setChecked] = useState(false)
    const[historyCache,setHistoryCache] = useState<{[key:string]:ExerciseType | null}>()

    const pathname = usePathname()
    const router = useRouter()

    const {setSeriesIndexesThatMetGoal} = useContext(SingleExerciseProgressionContext)!

    useEffect(()=>{
        const data = localStorage.getItem(name+'singleExercise')
        if(data){
            const parsedData = JSON.parse(data)
            dispatch({type:"SETSERIESFROMMEMORY",payload:parsedData})

            let indexes:ProgressedIndexesType = getProgressedSeriesIndexes(parsedData,exerciseProgression)
            setSeriesIndexesThatMetGoal(indexes)
        }
    },[name])
    
    const ResetLocalStorage = () => {
        localStorage.removeItem(name+"singleExercise")
    }
    const FinishTraining = async () => {
        if(!checked) return
        setError('')
        setLoading(true)
        

        const possibleError = await AddExerciseAction(false,name,state.series,pathname.includes('training'),'',handle,undefined,undefined,undefined,exerciseProgression)
        if(possibleError) {
            setError(e(possibleError.errors))
            setLoading(false)
            return
        }
        ResetLocalStorage()
        router.push('/home/add-exercise')
        setLoading(false)
    }

    const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
    const u = useTranslations("Utils")
    const d = useTranslations("DefaultExercises")
    const e = useTranslations("Errors")

    const exerciseName = exercisesArr.includes(name) ? d(nameTrimmer(name)) : name

  return (
    <div className={`px-4 flex flex-col pt-4 ${isTraining?'':'mb-24 min-h-[calc(100dvh-100px)]'}`}>
        <h1 className={`text-marmur text-xl text-center font-medium`}>{exerciseName}</h1>
        <div className={`flex flex-col sticky top-0 pt-2 mt-2 bg-dark pb-2 z-10`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs dispach={dispatch} state={state}/>
               <DifficultyLevel dispach={dispatch} state={state} showTimeMesure={showTimeMesure}/>
               <Side dispatch={dispatch} state={state} />
               {requiresHandle && <Handle handle={handle} setHandle={setHandle} allHandles={allHandles}/>}
            </div>
            <Timer />

            <ButtonToAddSeriesExercise
                name={name}
                dispatch={dispatch}
                isLoading={isLoading}
                loading={loading}
                state={state}
                goal={exerciseProgression}
            />
            <div className='grid mt-3 text-white w-full'>
                <div className={` justify-around grid ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'} mr-10 -mb-2 pl-7 w-[100vw-28px] bg-dark`}>
                <div className='font-light'>{u("Weight")}</div>
                <div className='font-light'>{u("Repeat")}</div>
                <div className='font-light'>{u("Difficulty")}</div>
            {showTimeMesure && <div className='font-light'>{u("Time")}</div>}
            </div>

        </div>
        </div>

        <DisplayCurrentSeries exercisename={name} currentSeries={state.series} dispatchSeries={dispatch} isTraining={isTraining} showTimeMesure={showTimeMesure} goal={exerciseProgression}/>
        <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory} loading={loading}/>
        {showHistory && <PreviousExercise exerciseid={exerciseid} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}

        <ShowProgressionSingleExercise 
            progression={exerciseProgression}
            currentExercise={name}
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

            <Button onClick={FinishTraining} disabled={loading} isPrimary className='w-full text-xl'>
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
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='weight'>{u("Weight")}</Label>
                <Input type="number" id='weight' onChange={e=>dispach({type:"WEIGHT",payload:Number(e.target.value)})} value={state.weight} min={1}/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='repeat'>{u("Repeat")}</Label>
                <Input type="number" id='repeat' onChange={e=>dispach({type:"REPEAT",payload:Number(e.target.value)})} value={state.repeat} min={1}/>
            </div>
        </div>
    )
}

const DifficultyLevel = ({dispach,state,showTimeMesure}:{dispach:React.Dispatch<ActionTypes>,state:AddExerciceReducerType,showTimeMesure:boolean}) => {
    const u = useTranslations("Utils")
    return(<div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='difficulty' className={`text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark`} >{u("Difficulty")}</label>
            <select name="difficulty" id="difficulty" className={`bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10`} onChange={e=>{dispach({type:"DIFFICULTY",payload:e.target.value as 'easy'|'medium'|'hard'})}}>
                <option value="easy">{u("Easy")}</option>
                <option value="medium">{u("Medium")}</option>
                <option value="hard">{u("Hard")}</option>
            </select>
        </div>
        {showTimeMesure &&             
            <div className='flex flex-col flex-1 relative'>
                <Label htmlFor='time'>{u("TimeInSeconds")}</Label>
                <Input type="number" id='time' onChange={e=>dispach({type:"TIME",payload:e.target.value})} value={state.time}/>
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

    const u = useTranslations("Utils")

    return(
        <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='side' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>{u("Side")}</label>
                <select name="side" value={state.side} id="side" className='bg-dark pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' onChange={e=>handleChange(e.target.value)}>
                    <option value="Both">{u("Both")}</option>
                    <option value="Left">{u("Left")}</option>
                    <option value="Right">{u("Right")}</option>
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

    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    return (
    <div className='flex gap-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>{u("Right")}</label>
            <select name="handle" id="side" className='bg-dark pl-3 text-marmur border-white border-[1px] rounded-md h-10' onChange={e=>handleChange(JSON.parse(e.target.value) as {id:string, handlename: string})}>
                {allHandles.map(handle=>{
                    const name = handleTypes.includes(handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                    return <option value={JSON.stringify(handle)} key={handle.id}>{name}</option>
                })}
            </select>
        </div>
    </div>
    )
}