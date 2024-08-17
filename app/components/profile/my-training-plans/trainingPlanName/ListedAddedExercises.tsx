import { Icon } from '@/app/components/Icon'
import { ThemeContext } from '@/app/context/ThemeContext'
import { TrainingExerciseType } from '@/app/types'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React, { useContext} from 'react'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type ListedAddedExercisesTypes = {
    planExercises: (TrainingExerciseType)[],
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}
export const ListedAddedExercises = ({planExercises,setPlanExercises}:ListedAddedExercisesTypes) => {
    const getExerciesPos = (id:string) => { return planExercises.findIndex(x=>x.id===id)}

    const handleDragEnd = (event: { active: any; over: any }) => {
        const { active, over } = event

        if(active.id === over.id) return
        setPlanExercises(exercises=>{
            const originalExercisePos = getExerciesPos(active.id)
            const newPos = getExerciesPos(over.id)

            return arrayMove(planExercises,originalExercisePos,newPos)
        })
    }
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint: {
                distance: 8
            }
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor,{
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
    <div className='mt-2 flex flex-col'>
        <SortableContext items={planExercises} strategy={verticalListSortingStrategy}>
            {planExercises.map((exercise,index)=>{
                return (
                    <SingleExercise key={exercise.id} name={exercise.exercisename} exercise={exercise} setPlanExercises={setPlanExercises}/>
                )
            })}
        </SortableContext>
    </div>
  </DndContext>)
}

type SingleExerciseTypes = {
    name:string,
    exercise:TrainingExerciseType,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}

const SingleExercise = ({name,exercise,setPlanExercises}:SingleExerciseTypes) => {
    const theme = useContext(ThemeContext)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id:exercise.id})
    const removeIndex = () => {
        setPlanExercises(x=>x.filter((name,index)=>name.id !== exercise.id))
    }
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return(
    <div className={`touch-none border-[${theme?.colorPallete.accent}] border-2 text-[${theme?.colorPallete.accent}] my-2 py-2 px-2 rounded-md flex justify-between items-center` } ref={setNodeRef} {...attributes} {...listeners}  style={style}>
        {name} 

        <Icon onClick={removeIndex}>
            <TrashIcon width='30'/>
        </Icon>
    </div>
)
}

