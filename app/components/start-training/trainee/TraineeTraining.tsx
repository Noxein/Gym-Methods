'use client'
import TraineeTrainingContext from "@/app/context/TraineeTrainingContext";
import TrainingName from "./TrainingName";

import TrainingNavigation from "./TrainingNavigation";
import { useContext, useState } from "react";
import { TimerContext } from "@/app/context/TimerContext";
import { differenceInSeconds } from "date-fns";
import CurrentTrainingWidget from "./CurrentTrainingWidget";
import { ExerciseType } from "@/app/types";
import { ShowHistoryButton } from "../../add-exercise/ShowHistoryButton";
import { PreviousExercise } from "../../home/start-training/PreviousExercise";
import TimeWrapperTraineeTraining from "./TimeWrapperTraineeTraining";
import SeriesDisplay from "./SeriesDisplay";

function TraineeTraining() {

    const { currentExerciseIndex, setCurrentExerciseIndex, training, handleInputChange, flipT, flipF, handleChange, handleCloseTraining } = useContext(TraineeTrainingContext)!;
    
    const {
        newDateSetter,
        setTimePassed,
    } = useContext(TimerContext)!

    if(!training) {
        return <div className="text-white text-center mt-20">Loading training...</div>
    }

     const[showHistory,setShowHistory] = useState(false)
    const[historyCache,setHistoryCache] = useState<{ [key: string]: ExerciseType | null; } | undefined>({})
        
    const currentExerciseId = training.exercises[currentExerciseIndex].exerciseid

    const getExerciseName = () => {
        return training.exercises[currentExerciseIndex].exercisename
    }
    const previousExercise = () => {
        if(currentExerciseIndex=== 0) return
        setCurrentExerciseIndex(currentExerciseIndex-1)

        const exerciseName = getExerciseName()

        const lastEditDate = localStorage.getItem(exerciseName+'date')
        const parsedDate = lastEditDate ? new Date(JSON.parse(lastEditDate)) : null;

        if(lastEditDate){
            setTimePassed(differenceInSeconds(new Date(),parsedDate!))
            newDateSetter(new Date(JSON.parse(lastEditDate)),exerciseName)
        } else {
            localStorage.setItem(exerciseName+'date',JSON.stringify(new Date()))
            newDateSetter(new Date(),exerciseName)
            setTimePassed(0)
            
        }     

    }

    const nextExercise = () => {
        const totalExercises = training.exercises.length

        if(currentExerciseIndex===totalExercises - 1) return
        const exerciseName = getExerciseName()
        setCurrentExerciseIndex(currentExerciseIndex+1)

        const lastEditDate = localStorage.getItem(exerciseName+'date')
        const parsedDate = lastEditDate ? new Date(JSON.parse(lastEditDate)) : null;

        if(lastEditDate){
            setTimePassed(differenceInSeconds(new Date(),parsedDate!))
            newDateSetter(new Date(JSON.parse(lastEditDate)),exerciseName)
        } else {
            localStorage.setItem(exerciseName+'date',JSON.stringify(new Date()))
            newDateSetter(new Date(),exerciseName)
            setTimePassed(0)
            
        }     
    }

    return ( 
        <div className="mx-5 mb-44">

        <div className="flex justify-between mt-2">
            <TrainingName />
            <TimeWrapperTraineeTraining currentExerciseIndex={currentExerciseIndex} training={training} />
        </div>
            
        <SeriesDisplay handleInputChange={handleInputChange} handleChange={handleChange} flipT={flipT} flipF={flipF}/>

        <div className="">
            <ShowHistoryButton isOpen={showHistory} setShowHistory={setShowHistory}/>
            {showHistory && <PreviousExercise exerciseid={currentExerciseId} historyCache={historyCache} setHistoryCache={setHistoryCache}/>}
        </div>

        <CurrentTrainingWidget currentExerciseIndex={currentExerciseIndex} training={training}/>
        
        <TrainingNavigation 
            previousExercise={previousExercise} 
            nextExercise={nextExercise} 
            currentExerciseIndex={currentExerciseIndex}
            handleCloseTraining={handleCloseTraining}
            totalExercises={training.exercises.length}
            />
        </div>
     );
}

export default TraineeTraining;