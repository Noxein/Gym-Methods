import { Icon } from '@/app/components/Icon'
import { ThemeContext } from '@/app/context/ThemeContext'
import { TrainingExerciseType } from '@/app/types'
import { TrashIcon, VerticalDots } from '@/app/ui/icons/ExpandIcon'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React, { useContext} from 'react'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type ListedAddedExercisesTypes = {
    planExercises: TrainingExerciseType[],
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
    <div className='mt-2 flex flex-col gap-2 mb-40'>
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
    <div className={`py-[1px] touch-none flex rounded-lg bg-${theme?.colorPallete.accent}`} ref={setNodeRef} {...attributes} {...listeners}  style={style}>
        <div className={`text-${theme?.colorPallete.accent} rounded-md flex justify-between items-center flex-1` } >
            <Icon className='px-0'>
                <VerticalDots />
            </Icon>

           <div className={`flex-1 bg-${theme?.colorPallete.primary} px-4 py-4 rounded-lg`}> {name} </div>
    
        </div>

        <Icon onClick={removeIndex} className='self-center pr-1'>
                <TrashIcon width='30' fill='#0D1317'/>
        </Icon>
    </div>
)
}
