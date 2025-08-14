'use client'

import { Icon } from "@/app/components/Icon";
import { LongPlanEditorContext } from "@/app/context/LongPlanEditorContext";
import { nameTrimmer } from "@/app/lib/utils";
import { ExerciseSubPlanData, SetsData, Side, UserExercise } from "@/app/types";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { v4 } from "uuid";

type SingleExerciseTypes = {
    exercise: ExerciseSubPlanData,
    planIndex: number,
    exerciseIndex: number,
    selecedExerciseIndex: number,
    setSelectedExerciseIndex: React.Dispatch<React.SetStateAction<number>>,
    allExercisesInOneArray: (string | UserExercise)[]
}

function SingleExercise({exercise,planIndex,exerciseIndex,selecedExerciseIndex,setSelectedExerciseIndex,allExercisesInOneArray}:SingleExerciseTypes) {

    const { planData,setPlanData,setShowDeleteExercisePopUp,exerciseIndexRef,handles,updateToLocalStorage,state } = useContext(LongPlanEditorContext)!
    
    const u = useTranslations("Utils")
    const d = useTranslations("DefaultExercises")

    const newName = allExercisesInOneArray.includes(exercise.exercisename) ? d(nameTrimmer(exercise.exercisename)) : exercise.exercisename

    const addSeries = () => {
        if(state === 'uploading') return

        let planDataCopy = {...planData!}
        let arr = planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals

        if(arr.length > 0){
            let latest = {...arr[arr.length-1]}
            latest.id = v4()
            planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals.push(latest)
        }else{
            if(planDataCopy.subplans[planIndex].exercises[exerciseIndex].istimeexercise){
                let obj = {
                    id: v4(),
                    repetitionsgoal:0,
                    side:"Both" as Side,
                    weightgoal:0,
                    timegoal: 1,
                }
                planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals.push(obj)
            }else{
                let obj = {
                    id: v4(),
                    repetitionsgoal:0,
                    side:"Both" as Side,
                    weightgoal:0,
                }
                planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals.push(obj)
            }
        }

        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const clickDivHandler = () => {
        if(state === 'uploading') return

        exerciseIndexRef.current = exerciseIndex
        setSelectedExerciseIndex(exerciseIndex)
    }

    const handleChange = (value: string) => {
        if(state === 'uploading') return
        
        const parsedHandle = JSON.parse(value) as {id: string;handlename: string;}
        let planDataCopy = {...planData!}
        planDataCopy.subplans[planIndex].exercises[selecedExerciseIndex].handle = {handleid: parsedHandle.id, handlename: parsedHandle.handlename}

        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }
    return (
    <div className={`bg-[#141e24] p-2 rounded-lg ${exerciseIndex === exerciseIndexRef.current? 'opacity-100' : 'opacity-50'}`} onClick={clickDivHandler}>

        <div className="flex justify-between items-center border-b-2 border-borderInteractive">

            <p>{newName}</p>

            <button onClick={()=>setShowDeleteExercisePopUp(true)}>
                <Icon>
                    <TrashIcon fill="#9F443C"/>
                </Icon>
            </button>

        </div>

        <div className={`pl-2 duration-200 `}>
            <div className="flex text-sm">

                <span className="flex-1">{u("Side")}</span>
                <span className="flex-1">{u("Weight")}</span>
                <span className="flex-1">{u("Repeat")}</span>

                {exercise.istimeexercise && <span className="flex-1">{u("Time")}</span>}
                <span className="invisible">           
                     <button>
                        <Icon>
                            <TrashIcon fill="#fff" width="20px"/>
                        </Icon>
                    </button>
                </span>

            </div>
            {exerciseIndex === exerciseIndexRef.current ? 
            <div>
                {exercise.setgoals.map((setGoal,setGoalIndex)=><SetGoal key={setGoal.id} setGoal={setGoal} planIndex={planIndex} exerciseIndex={exerciseIndex} setGoalIndex={setGoalIndex} istimeexercise={exercise.istimeexercise}/>)}
            </div> : 
            <div className="text-neutral-400 flex flex-col">
                {exercise.setgoals.map(set=><div key={set.id} className="flex">
                    <span className="flex-1">{u(set.side)} </span>
                    <span className="flex-1" >{set.weightgoal} </span>
                    <span className="flex-1">{set.repetitionsgoal}</span>
                        {set.timegoal &&<span className="flex-1">{set.timegoal}</span> } 
                </div>)}
            </div>}

            <button className="flex-1 text-center w-full mt-2 bg-green rounded py-2" disabled={state==='uploading'} onClick={addSeries}>{u("AddSeries")}</button>

            {exercise.handle && 
                <div className='relative w-full text-white mt-5'>

                    <label htmlFor="Uchwyt" className='absolute -top-1/4 text-base left-4 px-1 z-20'>

                        <div className='z-20 relative text-sm'>{u("Handle")}</div>
                        <div className='absolute h-2 w-[105%] bg-[#141e24] bottom-[7px] -left-1 text-base text-opacity-0 z-10'></div>

                    </label>
                    
                    <select id="Uchwyt" className='bg-dark border-2 border-borderInteractive rounded-lg pl-2 py-2 w-full outline-none z-0 relative' onChange={e=>handleChange(e.target.value)}>
                        {handles?.map(handle=><option value={JSON.stringify(handle)} key={handle.id}>{handle.handlename}</option>)}
                    </select>

                </div>
            }

        </div>
    </div>
);
}

export default SingleExercise;

type SetGoalType = {
    setGoal: SetsData,
    planIndex: number,
    exerciseIndex: number,
    setGoalIndex: number,
    istimeexercise: boolean
}

function SetGoal({setGoal,planIndex,exerciseIndex,setGoalIndex,istimeexercise}:SetGoalType){

    const u = useTranslations("Utils")

    const { planData,setPlanData,updateToLocalStorage,state } = useContext(LongPlanEditorContext)!
    const seriesData = setGoal

    const handleDeleteSeries = () => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}
        const filtered = planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals.filter((item,index)=>index!==setGoalIndex)
        planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals = filtered
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const editSide = () => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}
        const side = planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals[setGoalIndex].side
        const newSide = side === 'Both' ? 'Left' : side === 'Left' ? "Right" : "Both"
        planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals[setGoalIndex].side = newSide
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const editWeight = (value: number) => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}
        planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals[setGoalIndex].weightgoal = value
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const editRepetitions = (value: number) => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}
        planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals[setGoalIndex].repetitionsgoal = value
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }

    const editTime = (value: number) => {
        if(state === 'uploading') return
        const planDataCopy = {...planData!}
        planDataCopy.subplans[planIndex].exercises[exerciseIndex].setgoals[setGoalIndex].timegoal = value
        updateToLocalStorage(planDataCopy)
        setPlanData(planDataCopy)
    }
    return(
        <div className="flex items-center gap-1">
            
            <div className="flex-1">
                <button className="w-full bg-steel border-borderInteractive border-2 rounded pl-1 text-left" onClick={editSide}>{u(seriesData.side)}</button>
            </div>

            <div className="flex-1">
                <Input type="number" value={seriesData.weightgoal} onChange={e=>editWeight(Number(e.target.value))}/>
            </div>
            
            <div className="flex-1">
                <Input type="number" value={seriesData.repetitionsgoal} onChange={e=>editRepetitions(Number(e.target.value))}/>
            </div>

            {istimeexercise && 
            <div className="flex-1">
                <Input type="number" value={seriesData.timegoal} onChange={e=>editTime(Number(e.target.value))}/>
            </div>}
            <button onClick={handleDeleteSeries}>
                <Icon>
                    <TrashIcon fill="#fff" width="20px"/>
                </Icon>
            </button>
        </div>
    )
}

type InputTypes = {} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputTypes) => {
    return(
        <input type="text" {...rest} className="w-full bg-steel border-borderInteractive border-2 rounded pl-1"/>
    )
}