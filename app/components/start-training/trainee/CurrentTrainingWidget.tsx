import { TraineeSingleTraining } from "@/app/types";

type Props = {
    currentExerciseIndex: number,
    training: TraineeSingleTraining,
}

function CurrentTrainingWidget({ currentExerciseIndex, training }: Props) {
    return (        
        <div className="flex justify-center gap-2 fixed bottom-40 left-0 right-0 w-full z-50">
            {training.exercises.map((exercise,index)=>(
                <div key={exercise.exerciseid} className={`w-2 h-2 border-1 rounded-full border-green ${index === currentExerciseIndex ? 'bg-green' : ''}`}></div>
            ))}
        </div>
     );
}

export default CurrentTrainingWidget;