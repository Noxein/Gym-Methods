import { exerciseList } from '@/app/lib/exercise-list'
import { ListExercises } from './ListExercises'

export const ExerciseListMapped = async () => {

  return (
    <div className='flex flex-col mt-10'>
        <ListExercises item={exerciseList}/>
    </div>
  )
}

