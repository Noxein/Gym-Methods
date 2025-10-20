import { CheckIcon, CrossIcon } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../Icon";
import { useContext } from "react";
import { TimerContext } from "@/app/context/TimerContext";
import { LongPlanContext } from "@/app/context/LongPlanContext";

interface CheckobxTrueFalseTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    typeOfCheckbox: 'red'|'green',
    isChecked: boolean,
    isActive: boolean,
    goalMet: undefined | 'met' | 'notmet',
    seriesIndex: number,
}

function CheckobxTrueFalse({typeOfCheckbox,isChecked,isActive,goalMet,seriesIndex,...rest}:CheckobxTrueFalseTypes) {

        const { newDateSetter, setTimePassed } = useContext(TimerContext)!
    
    const {
        planData,
        setPlanData,
        currentExerciseIndex,
        setCurrentLocalData
    } = useContext(LongPlanContext)!

        const timerReset = () => {
        if(typeof goalMet === 'undefined'){
            newDateSetter(new Date())
            setTimePassed(0)
        }
    }

        const flipT = () => {
        timerReset()
        let planDataCopy = structuredClone(planData)

        let series = {...planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex]}

        series.actuallrepetitions = series.repetitionsgoal
        series.actuallweight = series.weightgoal
        series.isSetCompleted = true
        if(series.timegoal) series.actualltime = series.weightgoal
        
        planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex] = series

        setCurrentLocalData(planDataCopy.subplans[planData.currentplanindex])
        setPlanData(planDataCopy)
    }
    const flipF = () => {
        timerReset()
        //setGoalMet('notmet')
        let planDataCopy = structuredClone(planData)

        planDataCopy.subplans[planData.currentplanindex].exercises[currentExerciseIndex].setgoals[seriesIndex].isSetCompleted = false

        setCurrentLocalData(planDataCopy.subplans[planData.currentplanindex])
        setPlanData(planDataCopy)
    }

    if(typeOfCheckbox==='green') return (
    <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} ${isChecked? 'bg-green':'bg-green-200'} flex items-center justify-center rounded-lg`} {...rest} onClick={flipT}>
        <Icon>
            <CheckIcon fill="#fff"/>
        </Icon>
    </div>
     );

     return( 
    <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} border-borderInteractive ${isChecked? 'bg-red':'bg-red-200'} flex items-center justify-center rounded-lg`} {...rest} onClick={flipF}>
        <Icon>
            <CrossIcon fill="#fff" width="20" height="20"/>
        </Icon>
    </div>
     )
}

export default CheckobxTrueFalse;