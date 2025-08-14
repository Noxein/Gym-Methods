'use client'

import { LongPlanContext } from "@/app/context/LongPlanContext";
import { useContext, useState } from "react";
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
        setCurrentExerciseIndex
    } = useContext(LongPlanContext)!

    const[showHistory,setShowHistory] = useState(false)
    const[historyCache,setHistoryCache] = useState<{ [key: string]: ExerciseType | null; } | undefined>({})
    const[showCloseTrainingModal,setShowCloseTrainingModal] = useState(false)

    const currentPlanName = planData.subplans[planData.currentplanindex].name
    const currentExerciseName = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].exercisename
    const currentExerciseId = planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex].exerciseid 
    const totalExercises = planData.subplans[planData.currentplanindex].exercises.length

    const nextExercise = () => {
        if(currentExerciseIndex===totalExercises - 1) return
        console.log(currentExerciseIndex)
        setCurrentExerciseIndex(currentExerciseIndex+1)
    }

    const previousExercise = () => {
        if(currentExerciseIndex=== 0) return
        setCurrentExerciseIndex(currentExerciseIndex-1)
    }
    
    const flip = () => {
        setShowCloseTrainingModal(!showCloseTrainingModal)
    }
    const handleCloseTraining = async (planData:BigTrainingStarter) => {
        const error = await  updateBigPlan(planData,new Date())
    }
    return ( <div className="mx-5 mb-44">
        <p className="text-neutral-400">{planData.name}</p>

        <div>
            <div className="">

                <div className={`bg-darkLight rounded-lg px-5 h-[calc(50vh)] mt-2 overflow-scroll`}>
                    <p className="text-center text-white text-2xl font-semibold sticky top-0  ">
                        <p className="bg-darkLight pt-5">{currentPlanName} - {currentExerciseName}</p>
                        <div className="h-5 w-full bg-gradient-to-b from-darkLight to-transparent">

                        </div>
                    </p>

                    <SeriesDisplayer exercise={planData.subplans[planData.currentplanindex].exercises[currentExerciseIndex]} allHandles={allHandles}/>
                </div>
            </div>



        </div>
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
            <Button className={`${currentExerciseIndex===0 ? 'border-gray-700':null} w-16 h-16`} onClick={previousExercise}>
                <Icon>
                    <LeftAngle fill={currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
                </Icon>
            </Button>

            <Button isPrimary className="flex-1 h-16" onClick={flip}>Zakończ trening</Button>

            <Button className={`${currentExerciseIndex===totalExercises - 1 ? 'border-gray-700':null} w-16 h-16` } onClick={nextExercise}>
                <Icon>
                    <LeftAngle className='rotate-180' fill={currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
                </Icon>
            </Button>
        </div>
        {showCloseTrainingModal && 
            <BlurBackgroundModal onClick={flip}>
                <CloseTrainingModal flip={flip} handleCloseTraining={handleCloseTraining}/>
            </BlurBackgroundModal>}
    </div> );
}

export default DisplayLongTermTraining;