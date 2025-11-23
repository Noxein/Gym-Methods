import { useContext, useEffect } from "react";
import { Timer } from "../../add-exercise/Timer";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { TimerContext } from "@/app/context/TimerContext";
import { differenceInSeconds } from "date-fns";

function TimerWrapper() {
    const {
        planData,
        currentExerciseIndex,
    } = useContext(LongPlanContext)!

    const { setTimePassed,newDateSetter } = useContext(TimerContext)!
    
        useEffect(() => {
        const currentExerciseName = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].exercisename

        const timerData = localStorage.getItem(currentExerciseName+'date')
        const parsedTimerData = timerData ? new Date(JSON.parse(timerData)) : null;

        const nowDate = new Date()
        if(!timerData){
            
            localStorage.setItem(currentExerciseName+'date',JSON.stringify(nowDate))
            newDateSetter(nowDate,currentExerciseName)
            setTimePassed(0)
            return
        } 

        if(differenceInSeconds(nowDate,parsedTimerData!)>3600){
            localStorage.setItem(currentExerciseName+'date',JSON.stringify(nowDate))
            setTimePassed(0)
            return newDateSetter(nowDate,currentExerciseName)    
        }

        newDateSetter(parsedTimerData!,currentExerciseName)
        setTimePassed(differenceInSeconds(nowDate,parsedTimerData!))

    }, [])

    return (  <Timer className="mt-0"/>  );
}

export default TimerWrapper;