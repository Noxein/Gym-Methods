import { exerciseList } from '@/app/lib/exercise-list'
import { ListExercises } from './ListExercises'

export const ExerciseListMapped = async () => {

  return (
    <div className='flex flex-col mt-10 mb-20'>
        <ListExercises item={exerciseList}/>
    </div>
  )
}

