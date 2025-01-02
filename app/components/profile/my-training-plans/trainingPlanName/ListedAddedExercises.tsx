import { Icon } from '@/app/components/Icon'
import { nameTrimmer } from '@/app/lib/utils'
import { TrainingExerciseType, TrainingProgression } from '@/app/types'
import { TrashIcon, VerticalDots } from '@/app/ui/icons/ExpandIcon'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTranslations } from 'next-intl'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type ListedAddedExercisesTypes = {
    planExercises: TrainingProgression[],
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingProgression[]>>,
    showEdit: boolean,
}
export const ListedAddedExercises = ({planExercises,setPlanExercises,showEdit}:ListedAddedExercisesTypes) => {
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
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor,{
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    if(showEdit) return (
        <div className='flex flex-col gap-2 mb-40 mt-2'>
            <div className='flex gap-2 mx-5 text-white text-sm'>
                <span className='flex-1'>Cel (KG)</span>
                <span className='flex-1'>Serie</span>
                <span className='flex-1'>Powtórzenia</span>
                <span className='flex-1'>Przyrost</span>
                
            </div>
            {planExercises.map((exercise,index)=>{
                return (
                    <SingleExerciseEditable key={exercise.id} name={exercise.exercisename} exercise={exercise} setPlanExercises={setPlanExercises} index={index}/>
                )
            })}
        </div>
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
    exercise:TrainingProgression,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}

const SingleExercise = ({name,exercise,setPlanExercises}:SingleExerciseTypes) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id:exercise.id})
    const removeIndex = () => {
        setPlanExercises(x=>x.filter((name,index)=>name.id !== exercise.id))
    }
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    const d = useTranslations("DefaultExercises")
    const translatedName = d(nameTrimmer(name)).includes("DefaultExercises") ? name : d(nameTrimmer(name))
    return(
    <div className={`py-[2px] flex rounded-lg bg-borderInteractive`} ref={setNodeRef}  style={style} {...attributes}>
        <div className={`text-marmur rounded-md flex justify-between items-center flex-1` } {...listeners}>
            <Icon className='touch-none'  >
                <VerticalDots fill='#fff' width='20' height='30'/>
            </Icon>

            <div className={`flex-1 flex flex-col bg-dark px-4 pt-4 rounded-lg`}> 
                <span>{translatedName}</span>
                <span className='text-gray-400 py-0 my-0'>
                    {exercise.weightGoal ? exercise.weightGoal : 0}/
                    {exercise.series ? exercise.series : 0}/ 
                    {exercise.repetitions ? exercise.repetitions : 0}/ 
                    {exercise.increase ? exercise.increase : 0}
                    
                </span>
            </div>
    
        </div>

        <Icon onClick={removeIndex} className='self-center pr-1'>
                <TrashIcon width='30' fill='#fff'/>
        </Icon>
    </div>
)
}

type SingleExerciseEditableTypes = {
    name: string,
    exercise:TrainingProgression,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingProgression[]>>,
    index: number,
}
const SingleExerciseEditable = ({name,exercise,setPlanExercises,index}:SingleExerciseEditableTypes) => {
    const d = useTranslations("DefaultExercises")
    const translatedName = d(nameTrimmer(name)).includes("DefaultExercises") ? name : d(nameTrimmer(name))

    const handleChange = (value:string,key:'series'|'repetitions'|'increase'|'weightGoal') => {
        setPlanExercises(callback=>{
            let copy = [...callback]

            if(key === 'increase')    callback[index].increase    = Number(value)
            if(key === 'repetitions') callback[index].repetitions = Number(value)
            if(key === 'series')      callback[index].series      = Number(value)
            if(key === 'weightGoal')  callback[index].weightGoal  = Number(value)

            return copy
        })
    }
    return(
        <div className={`flex flex-col rounded-lg border-2 border-borderInteractive text-white`} >
               <div className={`flex-1 bg-dark px-4 py-4 rounded-lg flex justify-between`}>
                    <span>{translatedName} </span>
                    <span className='text-gray-400'>
                        {exercise.weightGoal ? exercise.weightGoal : 0}/
                        {exercise.series ? exercise.series : 0}/ 
                        {exercise.repetitions ? exercise.repetitions : 0}/ 
                        {exercise.increase ? exercise.increase : 0}/
                        
                    </span>
               </div>

               <div className='flex gap-2 px-2 pb-2 rounded'>
                    <Input type="number" value={exercise.weightGoal ? exercise.weightGoal : 0} onChange={e=>handleChange(e.target.value,'weightGoal')}/>
                    <Input type="number" value={exercise.series ? exercise.series : 0} onChange={e=>handleChange(e.target.value,'series')}/>
                    <Input type="number" value={exercise.repetitions ? exercise.repetitions : 0} onChange={e=>handleChange(e.target.value,'repetitions')}/>
                    <Input type="number" value={exercise.increase ? exercise.increase : 0} onChange={e=>handleChange(e.target.value,'increase')}/>
                    
               </div>
        </div>
    )
}

interface Input extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    
}
const Input = ({...rest}:Input) => {
return (
    <input {...rest} className='flex-1 bg-darkLight w-1/3 px-1 rounded'/>
)
}