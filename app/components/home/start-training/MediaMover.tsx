import { LongPlanContext } from "@/app/context/LongPlanContext";
import { useContext } from "react";
import SeriesDisplayer from "./SeriesDisplayer";
import { ExerciseTempo } from "../../ui/ExerciseTempo";
import { useExerciseTempos } from "@/app/lib/useExerciseTempos";

type MediaMoverTypes = {
    allHandles: {
        id: string;
        handlename: string;
    }[]
}

function MediaMover({allHandles}:MediaMoverTypes) {
    const {
        planData,
        currentExerciseIndex,
    } = useContext(LongPlanContext)!
    const tempos = useExerciseTempos()
    const currentPlanName = planData.subplans[planData.currentplanindex].name
    const exercise = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex]
    return (
        <div className=" duration-75 ">
            <div className={`bg-darkLight rounded-lg px-5 h-[50vh] mt-2`}>
                <div className="text-center text-white text-2xl font-semibold sticky top-0  z-30">
                    <p className="bg-darkLight pt-5">{currentPlanName} - {exercise.exercisename}</p>
                    <ExerciseTempo tempo={tempos[exercise.exerciseid]?.tempo} className="justify-center bg-darkLight pb-2"/>
                    <div className="h-5 w-full bg-gradient-to-b from-darkLight to-transparent">

                    </div>
                </div>

                <SeriesDisplayer exercise={exercise} allHandles={allHandles}/>
            </div>
        </div>);
}

export default MediaMover;