import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { Button } from "../../ui/Button";
import { useContext } from "react";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { TimerContext } from "@/app/context/TimerContext";
import { differenceInSeconds } from "date-fns";

function NextExerciseButton() {
    const {
        newDateSetter, 
        setTimePassed,
    } = useContext(TimerContext)!

    const {
        planData,
        currentExerciseIndex,
        setCurrentExerciseIndex,
    } = useContext(LongPlanContext)!

    const nextExercise = () => {
        if(currentExerciseIndex===totalExercises - 1) return
        const exerciseName = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex+1].exercisename
        setCurrentExerciseIndex(currentExerciseIndex+1)

        const date = localStorage.getItem(exerciseName+'date')
        const parsedDate = date ? new Date(JSON.parse(date)) : null;

        if(date){
            newDateSetter(new Date(JSON.parse(date)),exerciseName)
            setTimePassed(differenceInSeconds(new Date(),parsedDate!))
        } else {
            localStorage.setItem(exerciseName+'date',JSON.stringify(new Date()))
            setTimePassed(0)
            newDateSetter(new Date(),exerciseName)
        }

        
    }

    const totalExercises = planData.subplans[planData.currentplanindex].exercises.length

    return (             
    <Button className={`${currentExerciseIndex===totalExercises - 1 ? 'border-gray-700':null} w-16 h-16` } onClick={nextExercise}>
        <Icon>
            <LeftAngle className='rotate-180' fill={currentExerciseIndex===totalExercises - 1 ? '#777':'#fff'} height='40' width='40'/>
        </Icon>
    </Button> 
                );
}

export default NextExerciseButton;