import { TrainingExerciseType, UserExercise } from '@/app/types'
import { AddExercise } from './AddSingleExercise'

type SearchExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}
export const SearchExercisesTraining = ({allExercisesInOneArray,searchTerm,setPlanExercises}:SearchExercisesTypes) => {
    const filtered = allExercisesInOneArray.filter(x=>{
        if(typeof x === 'object'){
          return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
        }
        if(typeof x === 'string'){
          return x.toLowerCase().includes(searchTerm.toLowerCase())
        }
      })
  return (
    <FilteredExercises allExercisesInOneArray={filtered} setPlanExercises={setPlanExercises}/>
  )
}

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}
export const FilteredExercises = ({allExercisesInOneArray,setPlanExercises}:FilteredExercisesTypes) => {
    return (
        <div className='flex flex-col gap-2 mx-3'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <AddExercise mLeft='ml-2' key={x.id} isFirst={i===0} text={x.exercisename} id={x.id} setPlanExercises={setPlanExercises}/>
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <AddExercise mLeft='ml-2' key={x} isFirst={i===0} text={x} id={x} setPlanExercises={setPlanExercises}/>
                    )
                }
            })}
        </div>
      )
}

