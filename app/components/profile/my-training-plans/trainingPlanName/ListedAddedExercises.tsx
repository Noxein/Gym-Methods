import { Icon } from '@/app/components/Icon'
import { Button } from '@/app/components/ui/Button'
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
        useSensor(PointerSensor),
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

            <div className={`flex-1 flex flex-col bg-dark px-4 py-4 rounded-lg`}> 
                <span>{translatedName}</span>
            </div>
    
        </div>

        <Icon onClick={removeIndex} className='self-center pr-1'>
                <TrashIcon width='30' fill='#fff'/>
        </Icon>
    </div>
)
}
let arr = [1]
type SingleExerciseEditableTypes = {
    name: string,
    exercise:TrainingProgression,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingProgression[]>>,
    index: number,
    planExercises: TrainingProgression[]
}
// const SingleExerciseEditable = ({name,exercise,setPlanExercises,index,planExercises}:SingleExerciseEditableTypes) => {
//     const d = useTranslations("DefaultExercises")
//     const translatedName = d(nameTrimmer(name)).includes("DefaultExercises") ? name : d(nameTrimmer(name))

//     const handleChange = (value:string,key:'series'|'repetitions'|'increase'|'weightGoal',nestedIndex:number) => {
//         setPlanExercises(callback=>{
//             let copy = [...callback]
//             if(!copy[index].series) return callback

//             if(key === 'increase')    copy[index].series[nestedIndex].increase = Number(value)
//             if(key === 'repetitions') copy[index].series[nestedIndex].repetitions = Number(value)
//             if(key === 'weightGoal')  copy[index].series[nestedIndex].weightGoal  = Number(value)

//             return copy
//         })
//     }
//     const handleAddSeries = () => {
//         arr.push(arr[arr.length-1] + 1)
//         let copy = [...planExercises]
//         if(!copy[index].series){
//             copy[index].series = [{increase:0,repetitions:0,weightGoal:0}]
//         }else{
//             copy[index].series = [...copy[index].series!,{increase:0,repetitions:0,weightGoal:0}]
//         }
//         setPlanExercises(copy)
//     }

//     const dataToMap = exercise.series ? exercise.series : []

//     return(
//         <div className={`flex flex-col rounded-lg border-2 border-borderInteractive text-white`} >
//                <div className={`flex-1 bg-dark px-4 py-4 rounded-lg flex justify-between`}>
//                     <span>{translatedName} </span>
//                </div>

//                <div className='flex gap-2 px-2 pb-2 rounded flex-col'>
//                     {dataToMap.map((singleSeries,nestedIndex)=>{
//                         return(
//                         <div key={`${arr[index]} ${nestedIndex}`} className='flex gap-2'>
//                             <Input type="number" value={singleSeries.weightGoal ? singleSeries.weightGoal : 0} onChange={e=>handleChange(e.target.value,'weightGoal',nestedIndex)}/>
//                             <Input type="number" value={singleSeries.repetitions ? singleSeries.repetitions : 0} onChange={e=>handleChange(e.target.value,'repetitions',nestedIndex)}/>
//                             <Input type="number" value={singleSeries.increase ? singleSeries.increase : 0} onChange={e=>handleChange(e.target.value,'increase',nestedIndex)}/>
//                         </div>
//                     )})}
//                     <Button isPrimary={false} onClick={handleAddSeries}>
//                         Dodaj serię
//                     </Button>
//                </div>
//         </div>
//     )
// }

interface Input extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    
}
const Input = ({...rest}:Input) => {
return (
    <input {...rest} className='flex-1 bg-darkLight w-1/3 px-1 rounded'/>
)
}