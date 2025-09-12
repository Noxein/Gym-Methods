import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { Button } from "../../ui/Button";
import { useContext } from "react";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { TimerContext } from "@/app/context/TimerContext";

function NextExerciseButton() {
    const {
        planData,
        currentExerciseIndex,
        setCurrentExerciseIndex,
    } = useContext(LongPlanContext)!

    const nextExercise = () => {
        if(currentExerciseIndex===totalExercises - 1) return
        setCurrentExerciseIndex(currentExerciseIndex+1)
        setFirstDate(new Date())
        setTimePassed(0)
    }

    const {
        setFirstDate,
        setTimePassed,
    } = useContext(TimerContext)!

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