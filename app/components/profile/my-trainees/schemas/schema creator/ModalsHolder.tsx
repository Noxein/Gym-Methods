'use client'
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { MapExercises } from "@/app/components/ui/MapExercises";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { useContext } from "react";
import { v4 } from "uuid";
import CustomModal from "./CustomModal";

function ModalsHolder() {

    const { schema, setSchema, allExercisesInOneArray, allExercises, showExerciseModal, setShowExerciseModal, latestPlanIndexClicked, confirmationModal } = useContext(TrainingSchemaContext)!

        const handleAddExerciseToPlan = (exerciseId: string, exerciseName?: string) => {
        setShowExerciseModal(false);
        // Logic to add the exercise to the plan using the exerciseId
        let schemaCopy = structuredClone(schema);

        schemaCopy.plan[latestPlanIndexClicked.current].exercises.push({
            id: v4(),
            exerciseid: exerciseId,
            exercisename: exerciseName || exerciseId,

        })

        setSchema(schemaCopy);
        HideShowHTMLScrollbar('show');
    }

    return ( 
        <div>
            {showExerciseModal && <BlurBackgroundModal className="z-50">
                <MapExercises 
                    allExercisesInOneArray={allExercisesInOneArray}
                    exercisesObject={allExercises}
                    handleClose={() => {
                        setShowExerciseModal(false);
                        HideShowHTMLScrollbar('show');
                    }}
                    handleSelect={handleAddExerciseToPlan}
                />
            </BlurBackgroundModal>}

            {confirmationModal && confirmationModal.isOpen && <CustomModal />}
        </div>
     );
}

export default ModalsHolder;