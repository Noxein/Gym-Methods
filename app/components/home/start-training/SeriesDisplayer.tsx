import { LongPlanContext } from "@/app/context/LongPlanContext";
import { ExerciseSubPlanStarter, SetsDataStarter } from "@/app/types";
import { useContext, useState } from "react";
import CheckobxTrueFalse from "../../ui/CheckboxTrueFalse";
import { nameTrimmer } from "@/app/lib/utils";
import { handleTypes } from "@/app/lib/exercise-list";
import { useTranslations } from "next-intl";

type SeriesDisplayerTypes = {
    exercise: ExerciseSubPlanStarter,
        allHandles: {
            id: string;
            handlename: string;
        }[]
}

function SeriesDisplayer({exercise,allHandles}:SeriesDisplayerTypes) {
    
    const {
        planData,
        setPlanData,
        currentExerciseIndex,
        setCurrentExerciseIndex
    } = useContext(LongPlanContext)!


    const handleChange = (handle:string) => {
        const parsedHandle = JSON.parse(handle) as {id: string;handlename: string;}
        let planDataCopy = {...planData}

        planDataCopy.subplans[planDataCopy.currentplanindex].exercises[currentExerciseIndex].handle = {handleid: parsedHandle.id, handlename: parsedHandle.handlename}

        setPlanData(planDataCopy)
    }
        
    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    return ( 
    <div className="flex flex-col gap-2 text-white ">

        {exercise.handle && <div className='flex gap-2'>
            <div className='flex-1 flex flex-col text-lg relative'>
                <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-darkLight'>{u("Handle")}</label>
                <select name="handle" id="side" className='bg-darkLight pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' onChange={e=>handleChange(e.target.value)} value={JSON.stringify({id:exercise.handle.handleid,handlename:exercise.handle.handlename})}>
                    {allHandles.map(handle=>{
                        const name = handleTypes.includes(handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                        return <option value={JSON.stringify(handle)} key={handle.id}>{name}</option>
                    })}
                </select>
            </div>
        </div>}



        {exercise.setgoals.map((goal,index)=>(
            <SingleSet key={goal.id} goal={goal} seriesIndex={index}/>
        ))}
    </div>
    );
}

export default SeriesDisplayer;

type SingleSetTypes = {
    goal: SetsDataStarter,
    seriesIndex: number
}

const SingleSet = ({goal,seriesIndex}:SingleSetTypes) => {

    const {
        planData,
        setPlanData,
        currentExerciseIndex
    } = useContext(LongPlanContext)!

    const checkIfSetIsMet = () => {
        if(goal.isSetCompleted === undefined) return undefined
        if(goal.isSetCompleted) return 'met'
        return 'notmet'
}

    const[goalMet,setGoalMet] = useState<undefined|'met'|'notmet'>(checkIfSetIsMet())

    const[weight,setWeight] = useState(goal.actuallweight)
    const[repetitions,setRepetitins] = useState(goal.actuallrepetitions)
    const[time,setTime] = useState(goal.actualltime)



    const flipT = () => {
        setGoalMet('met')
        let planDataCopy = {...planData}
        let series = {...planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex]}
        series.actuallrepetitions = series.repetitionsgoal
        series.actuallweight = series.weightgoal
        if(series.timegoal) series.actualltime = series.weightgoal
        series.isSetCompleted = true

        planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex] = series
        setPlanData(planDataCopy)
    }
    const flipF = () => {
        setGoalMet('notmet')
        let planDataCopy = {...planData}
        let series = {...planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex]}
        planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex] = series
        series.isSetCompleted = false
        setPlanData(planDataCopy)
    }

    const handleInputChange = (value:number,changedField:'weight'|'repetition'|'time') => {
        let planDataCopy = {...planData}
        let series = {...planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex]}
        if(changedField==='weight'){
            setWeight(value)
            series.actuallweight = value
        } 
        if(changedField==='repetition'){
            setRepetitins(value)
            series.actuallrepetitions = value
        } 
        if(changedField==='time'){
            setTime(value)
            series.actualltime = value
        } 
        planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex] = series
        setPlanData(planDataCopy)

    }
    return(
        <div className={`px-4 py-2 border-2 border-borderInteractive rounded-lg flex flex-col  ${goalMet!== undefined && goalMet === 'met' ? 'bg-gradient-to-tr from-green-700 to-green' : goalMet!== undefined && goalMet === 'notmet' ? 'bg-gradient-to-r from-red to-red-200' : ''}`}>
            <div className="flex justify-around">
                <CheckobxTrueFalse typeOfCheckbox='green' isChecked={goalMet===undefined ? false : goalMet==='met' ? true : false} isActive={goalMet!==undefined} onClick={flipT}/>

                <div className="flex-1 justify-around flex">
                    <span>{goal.repetitionsgoal} x</span>
                    <span>{goal.weightgoal} KG</span>
                    {goal.timegoal && <span>{goal.timegoal} s</span>}
                </div>

                <CheckobxTrueFalse typeOfCheckbox='red' isChecked={goalMet===undefined ? false : goalMet==='notmet' ? true : false} isActive={goalMet!==undefined} onClick={flipF}/>
            </div>
            {goalMet === 'notmet' && 
                <div className="flex gap-2 mx-5 mt-2">
                    <DivWithInput spanText="x" value={repetitions} onChange={e=>handleInputChange(Number(e.target.value),"repetition")}/>
                    <DivWithInput spanText="KG" value={weight} onChange={e=>handleInputChange(Number(e.target.value),"weight")}/>
                    {goal.timegoal && <DivWithInput spanText="s" value={time} onChange={e=>handleInputChange(Number(e.target.value),"time")}/>}
                </div>
                }
            
        </div>
    )
}

interface DivWithInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    spanText: string,
}
const DivWithInput = ({spanText,...rest}:DivWithInput) => {
    return (
        <div className="flex-1 flex gap-1">
            <input type="number" className="w-full bg-[#ffffff00] border-white rounded border-1 pl-1" {...rest}/> <span>{spanText}</span> 
        </div>
    )
}