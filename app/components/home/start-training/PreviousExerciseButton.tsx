import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { Button } from "../../ui/Button";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { TimerContext } from "@/app/context/TimerContext";
import { useContext } from "react";

function PreviousExerciseButton() {
    const {
        planData,
        currentExerciseIndex,
        setCurrentExerciseIndex,
    } = useContext(LongPlanContext)!

    const {
        setFirstDate,
        setTimePassed,
    } = useContext(TimerContext)!
    
    const previousExercise = () => {
        if(currentExerciseIndex=== 0) return
        setCurrentExerciseIndex(currentExerciseIndex-1)
        setFirstDate(new Date())
        setTimePassed(0)
    }

    return ( 
        <Button className={`${currentExerciseIndex===0 ? 'border-gray-700':null} w-16 h-16`} onClick={previousExercise}>
            <Icon>
                <LeftAngle fill={currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
            </Icon>
        </Button>
    );
}

export default PreviousExerciseButton;