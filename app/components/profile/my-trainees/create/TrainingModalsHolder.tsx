'use client'

import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { MapExercises } from "@/app/components/ui/MapExercises";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { TraineeSingleExercise, UserExercise } from "@/app/types";
import { useContext } from "react";
import { v4 } from "uuid";
import SinglePlanModal from "./SinglePlanModal";

function TrainingModalsHolder() {
    const { plan, setPlan, allExercisesInOneArray, allExercises, showExerciseModal, setShowExerciseModal, allHandles, latestPlanIndexClicked, exercisesThatRequireHandle, showSinglePlanModal, setShowSinglePlanModal, loading } = useContext(CreateTrainingContext)!

    const handleCloseExerciseModal = () => {
        if(loading) return;
        setShowExerciseModal(false)
    }

    const handleSelectExercise = (id:string, name?:string) => {
        if(loading) return;
        let planCopy = structuredClone(plan)

        let singleExerciseToAdd: TraineeSingleExercise = {
            id: v4(),
            exerciseid: id,
            exercisename: name ? name : id,
            sets:[],
            handle: exercisesThatRequireHandle.some(exercise => exercise.id === id) ? allHandles[0] : undefined
        }

        planCopy.plan[latestPlanIndexClicked.current].exercises.push(singleExerciseToAdd)
        setPlan(planCopy)
        setShowExerciseModal(false)
    }

    return ( 
        <div>
            {showExerciseModal &&<BlurBackgroundModal className="z-50">
                <MapExercises allExercisesInOneArray={allExercisesInOneArray} exercisesObject={allExercises} handleClose={handleCloseExerciseModal} handleSelect={handleSelectExercise}/>
            </BlurBackgroundModal>}
            
            {showSinglePlanModal && 
                <BlurBackgroundModal >
                    <SinglePlanModal />
                </BlurBackgroundModal>}
        </div>
     );
}

export default TrainingModalsHolder;