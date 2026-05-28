import { TrainerSingleExerciseSchema } from "@/app/types";
import Exercise from "./Exercise";

type ExercisesProps = {
    planIndex: number;
    exercises: TrainerSingleExerciseSchema[];
}

function Exercises({ planIndex,exercises }: ExercisesProps) {
    return ( 
    <div className="flex flex-col gap-2">
        {exercises.map((exercise,index) => (
            <Exercise key={exercise.id} exercise={exercise} planIndex={planIndex} exerciseIndex={index} totalExercisesLength={exercises.length}/>
        ))}
    </div> 
    );
}

export default Exercises;