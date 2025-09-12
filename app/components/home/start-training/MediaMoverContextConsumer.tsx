import { MediaMoverContext } from "@/app/context/MediaMoverContext";
import { useContext } from "react";
import SeriesDisplayer from "./SeriesDisplayer";
import { BigTrainingStarter } from "@/app/types";
import { LongPlanContext } from "@/app/context/LongPlanContext";
import { useRouter } from "next/router";

type MediaMoverContextConsumerTypes = {
    currentPlanName: string,
    currentExerciseIndex: number,
    planData: BigTrainingStarter,
    allHandles: {
        id: string;
        handlename: string;
    }[]
}

function MediaMoverContextConsumer({currentExerciseIndex,currentPlanName,planData,allHandles}:MediaMoverContextConsumerTypes) {
    const {
        setCurrentExerciseIndex
    } = useContext(LongPlanContext)!

    const {
        current,
        start,
        totalwidth,
        touchEnd,
        touchMove
    } = useContext(MediaMoverContext)!
        
    const media = (e: React.TouchEvent<HTMLDivElement>) => {
        const val = touchEnd(e)
        
        if(val === 'none') return
        if(val === 'left') currentExerciseIndex < planData.subplans[planData.currentplanindex].exercises.length - 1 && setCurrentExerciseIndex(currentExerciseIndex+1)
        if(val === 'right') currentExerciseIndex > 0 && setCurrentExerciseIndex(currentExerciseIndex-1)
    }

    const touchMoveEvent = (e:React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault
        touchMove(e)
    }
    return (     
    <div className="flex overflow-hidden touch-none" onTouchMove={touchMoveEvent} onTouchEnd={media}>
        {planData.subplans[planData.currentplanindex].exercises.map(exercise=>            
            <div className="relative duration-75 w-[94vw]" key={exercise.exerciseid} style={{ transform: `translateX(-${currentExerciseIndex * totalwidth - (current - start)}px)`}}>
                <div className={`bg-darkLight rounded-lg px-5 h-[calc(50vh)] w-[94vw] mt-2 overflow-scroll elementWidth`}>
                    <div className="text-center text-white text-2xl font-semibold sticky top-0  z-30">
                        <p className="bg-darkLight pt-5">{currentPlanName} - {exercise.exercisename}</p>
                        <div className="h-5 w-full bg-gradient-to-b from-darkLight to-transparent">

                        </div>
                    </div>

                    <SeriesDisplayer exercise={exercise} allHandles={allHandles}/>
                </div>
            </div>
                
            )}
        </div>  );
}

export default MediaMoverContextConsumer;