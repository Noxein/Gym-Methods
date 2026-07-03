'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { nameTrimmer } from "@/app/lib/utils";
import { TrainerSingleExerciseSchema } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Icon } from "@/app/components/Icon";
import { TrashIcon } from "@/app/ui/icons/ExpandIcon";
import Sets from "./Sets";
import { exercisesArr } from "@/app/lib/exercise-list";

type ExerciseProps = {
    planIndex: number,
    exerciseIndex: number
}

function Exercise({ planIndex, exerciseIndex }: ExerciseProps) {

    const { plan, setPlan, exercisesThatRequireHandle, loading } = useContext(CreateTrainingContext)!

    const exercise = plan.plan[planIndex].exercises[exerciseIndex]

    const usesHandle = exercisesThatRequireHandle.some(exe => exe.id === exercise.exerciseid)
    const de = useTranslations("DefaultExercises")

    const translatedExerciseName = exercisesArr.includes(exercise.exercisename) ? de(nameTrimmer(exercise.exercisename)) : exercise.exercisename

    const handleDeleteExercise = () => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises.splice(exerciseIndex, 1)
        setPlan(planCopy)
    }
    return ( 
        <div className="rounded border-2 border-borderInteractive p-3 bg-borderInteractive/10">

            <div className="flex items-center mb-4">
                <p className="flex-1 text-left pl-4 text-xl">{translatedExerciseName}</p>
                <Icon onClick={handleDeleteExercise}>
                    <TrashIcon fill="#d9d9d9"/>
                </Icon>
            </div>
            {usesHandle && <Handle exercise={exercise} planIndex={planIndex} exerciseIndex={exerciseIndex} />}

            <Sets sets={exercise.sets} exerciseIndex={exerciseIndex} planIndex={planIndex} exercise={exercise}/>

        </div>
     );
}

export default Exercise;

type HandleProps = {
    planIndex: number;
    exerciseIndex: number;
    exercise: TrainerSingleExerciseSchema;
}

function Handle({ exercise, planIndex, exerciseIndex }: HandleProps) {
    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    const { plan, setPlan, allHandles, loading } = useContext(CreateTrainingContext)!

    const selectedHandle = exercise.handle ? {id: exercise.handle.id, handlename: exercise.handle.handlename} : allHandles[0]

    const handleHandleChange = (obj:{id:string,handlename:string}) => {
        if(loading) return;

        let planCopy = structuredClone(plan)
        planCopy.plan[planIndex].exercises[exerciseIndex].handle = obj
        setPlan(planCopy)
    }

    return ( 
    <div className='flex gap-2 mt-2 px-5 pb-4'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-dark'>{u("Handle")}</label>
            <select  name="handle" id="side" className='bg-darkLight pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' value={JSON.stringify(selectedHandle)} onChange={e=>handleHandleChange(JSON.parse(e.target.value) as {id:string, handlename: string})} disabled={loading}>
                {allHandles.map(handle=>{
                    const name = allHandles.some(h => h.handlename === handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                    return <option value={JSON.stringify(handle)} key={handle.id}>{name}</option>
                })}
            </select>
        </div>
    </div>
     );
}
