import { useContext, useEffect } from "react";
import { Timer } from "../../add-exercise/Timer";
import { TimerContext } from "@/app/context/TimerContext";
import { TraineeSingleTraining } from "@/app/types";
import { differenceInSeconds } from "date-fns";

type TimeWrapperTraineeTrainingTypes = {
    currentExerciseIndex: number;
    training: TraineeSingleTraining
}
function TimeWrapperTraineeTraining({ currentExerciseIndex, training }: TimeWrapperTraineeTrainingTypes) {

    const { setTimePassed,newDateSetter } = useContext(TimerContext)!
    
    useEffect(() => {
        const currentExerciseName = training.exercises[currentExerciseIndex].exercisename

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
    
    return ( <Timer className="mt-0"/> );
}

export default TimeWrapperTraineeTraining;