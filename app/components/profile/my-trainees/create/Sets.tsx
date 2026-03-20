import { Series, TraineeSetGoal, TraineeSingleExercise } from "@/app/types";
import Set from './Set'
import AddSetButton from "./AddSetButton";

type SetsProps = {
    sets: {
        goal: TraineeSetGoal;
        actual: Series;
    }[],
    exerciseIndex: number,
    planIndex: number,
    exercise: TraineeSingleExercise
}
function Sets({ sets, exerciseIndex, planIndex, exercise }: SetsProps) {
    return ( 
    <div className="flex flex-col gap-4">
        {sets.map((set, index) => (
            <Set key={set.goal.id} set={set} setIndex={index} exerciseIndex={exerciseIndex} planIndex={planIndex} exercise={exercise} />
        ))}
        <AddSetButton exerciseIndex={exerciseIndex} planIndex={planIndex}/>
    </div>
 );
}

export default Sets;