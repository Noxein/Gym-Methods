import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { Button } from "../../ui/Button";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { TimerContext } from "@/app/context/TimerContext";
import { useContext } from "react";
import { differenceInSeconds } from "date-fns";

function PreviousExerciseButton() {
    const {
        planData, 
        currentExerciseIndex,
        setCurrentExerciseIndex,
    } = useContext(LongPlanContext)!

    const {
        newDateSetter,
        setTimePassed,
    } = useContext(TimerContext)!
    
    const previousExercise = () => {
        if(currentExerciseIndex=== 0) return
        setCurrentExerciseIndex(currentExerciseIndex-1)
        
        const exerciseName = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex-1].exercisename
        

        const date = localStorage.getItem(exerciseName+'date')
        const parsedDate = date ? new Date(JSON.parse(date)) : null;
        if(date){
            setTimePassed(differenceInSeconds(new Date(),parsedDate!))
            newDateSetter(new Date(JSON.parse(date)),exerciseName)
        } else {
            localStorage.setItem(exerciseName+'date',JSON.stringify(new Date()))
            newDateSetter(new Date(),exerciseName)
            setTimePassed(0)
            
        }       
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