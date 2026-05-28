import { Select } from "@/app/components/ui/SelectField";
import HandleContext from "@/app/context/TrainingSchemaContext";
import { TrainerSingleExerciseSchema } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import Handle from "./Handle";
import { Icon } from "@/app/components/Icon";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import { nameTrimmer } from "@/app/lib/utils";

type ExerciseProps = {
    planIndex: number;
    exerciseIndex: number
    exercise: TrainerSingleExerciseSchema;
    totalExercisesLength: number;
}

function Exercise({ planIndex, exerciseIndex, exercise, totalExercisesLength }: ExerciseProps) {

    const { schema, setSchema, latestExerciseIndexClicked, exercisesThatUseHandles, allExercisesInOneArray, loading } = useContext(HandleContext)!

    const updateLatestExerciseIndexClicked = () => {
        latestExerciseIndexClicked.current = exerciseIndex;
    }

    const handleDeleteExercise = () => {
        if(loading) return;
        let schemaCopy = structuredClone(schema);
        schemaCopy.plan[planIndex].exercises.splice(exerciseIndex, 1);
        // Update the schema with the modified copy
        setSchema(schemaCopy);
    }

    const d = useTranslations("DefaultExercises")
    const translatedName = allExercisesInOneArray.includes(exercise.exercisename) ? d(nameTrimmer(exercise.exercisename)) : exercise.exercisename

    const usesHandle = exercisesThatUseHandles.some(handle => {
        if(typeof handle === 'string'){
            return handle === exercise.exercisename
        }
        if(typeof handle === 'object'){
            return handle.exercisename === exercise.exercisename
        }
    })
    
    return ( 
    <div onClick={updateLatestExerciseIndexClicked} className={`bg-darkLight p-3 flex flex-col gap-3 text-white border-borderInteractive ${exerciseIndex === totalExercisesLength - 1 ? '' : 'border-b-2'}`}>
        <div className="flex justify-between">
            <p>{translatedName}</p>
            <Icon onClick={handleDeleteExercise} >
                <TrashIcon fill="#d9d9d9"/>
            </Icon>
        </div>
        

        {usesHandle && <Handle exercise={exercise} planIndex={planIndex} exerciseIndex={exerciseIndex} />}
    </div> 
    );
}

export default Exercise;