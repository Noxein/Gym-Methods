import { LongPlanContext } from "@/app/context/LongPlanContext";
import { useContext } from "react";
import SeriesDisplayer from "./SeriesDisplayer";
import { MediaMoverContextProvider } from "@/app/context/MediaMoverContext";
import MediaMoverContextConsumer from "./MediaMoverContextConsumer";

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

    const currentPlanName = planData.subplans[planData.currentplanindex].name
    return (
        <MediaMoverContextProvider>         
            <MediaMoverContextConsumer currentExerciseIndex={currentExerciseIndex} allHandles={allHandles} currentPlanName={currentPlanName} planData={planData}/>
        </MediaMoverContextProvider>);
}

export default MediaMover;