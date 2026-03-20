'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useContext } from "react";
import Exercise from "./Exercise";
import AddExercsieButton from "./AddExercsieButton";

type ExercisesProps = {
    planIndex: number
}

function Exercises({ planIndex }: ExercisesProps) {

    const { plan } = useContext(CreateTrainingContext)!
    return (             
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {plan.plan[planIndex].exercises.map((exercise, index) => (
                    <Exercise exerciseIndex={index} planIndex={planIndex} key={exercise.id}/>
                ))}
            </div>


            <AddExercsieButton />
        </div> );
}

export default Exercises;