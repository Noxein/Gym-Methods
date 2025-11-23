'use client'

import { LongPlanContext } from "@/app/context/LongPlanContext";
import { useContext, useEffect, useState } from "react";
import SeriesDisplayer from "./SeriesDisplayer";
import { ShowHistoryButton } from "../../add-exercise/ShowHistoryButton";
import { PreviousExercise } from "./PreviousExercise";
import { BigTrainingStarter, ExerciseType } from "@/app/types";
import { Button } from "../../ui/Button";
import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { BlurBackgroundModal } from "../../BlurBackgroundModal";
import CloseTrainingModal from "./CloseTrainingModal";
import { updateBigPlan } from "@/app/actions";
import MediaMover from "./MediaMover";
import { Timer } from "../../add-exercise/Timer";
import { TimerContext } from "@/app/context/TimerContext";
import TimerWrapper from "./TimerWrapper";
import NextExerciseButton from "./NextExerciseButton";
import PreviousExerciseButton from "./PreviousExerciseButton";
import { useRouter } from "next/navigation";
import { differenceInSeconds } from "date-fns";

type DisplayLongTermTrainingTypes = {
    allHandles: {
        id: string;
        handlename: string;
    }[]
}

function DisplayLongTermTraining({allHandles}:DisplayLongTermTrainingTypes) {
    const {
        planData,
        currentExerciseIndex,
        deleteCurrentLocalData
    } = useContext(LongPlanContext)!

    const router = useRouter()

    

    const[showHistory,setShowHistory] = useState(false)
    const[historyCache,setHistoryCache] = useState<{ [key: string]: ExerciseType | null; } | undefined>({})
    const[showCloseTrainingModal,setShowCloseTrainingModal] = useState(false)
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState('')

    const currentExerciseId = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].exerciseid 
    
    const flip = () => {
        setShowCloseTrainingModal(!showCloseTrainingModal)
    }

    const handleCloseTraining = async (planData:BigTrainingStarter) => {
        setLoading(true)

        const error = await  updateBigPlan(planData,new Date())

        if(error){
            setError(error.error)
            setLoading(false)
            return
        }

        deleteCurrentLocalData()
        router.push('/home')
        setLoading(false)

    }
    console.log('render DisplayLongTermTraining')

    return ( <div className="mx-5 mb-44">
        <div className="flex justify-between mt-2">
            <p className="text-neutral-400">{planData.name}</p>
            <TimerWrapper />
        </div>

        <MediaMover allHandles={allHandles}/>

        <div className="">
            <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory}/>
            {showHistory && <PreviousExercise exerciseid={currentExerciseId} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}
        </div>

        <div className="flex justify-center gap-2 fixed bottom-40 left-0 right-0 w-full z-50">
            {planData.subplans[planData.currentplanindex].exercises.map((exercise,index)=>(
                <div key={exercise.exerciseid} className={`w-2 h-2 border-1 rounded-full border-green ${index === currentExerciseIndex ? 'bg-green' : ''}`}></div>
            ))}
        </div>

        <div className="flex gap-2 mt-2 fixed bottom-20 w-[calc(100vw-40px)]">
            <PreviousExerciseButton />

            <Button isPrimary className="flex-1 h-16" onClick={flip}>Zakończ trening</Button>

            <NextExerciseButton />
        </div>
        {showCloseTrainingModal && 
            <BlurBackgroundModal onClick={flip}>
                <CloseTrainingModal flip={flip} handleCloseTraining={handleCloseTraining} loading={loading} error={error}/>
            </BlurBackgroundModal>}
    </div> );
}

export default DisplayLongTermTraining;