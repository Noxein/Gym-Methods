import { SearchComponent } from './SearchComponent'
import { ExerciseTypes, UserExercise } from '@/app/types'
import { SelectedExerciseContextProvider } from './SelectedExerciseContext'

type SearchPageTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
}
export const SearchPage = ({exerciseList,exercises}:SearchPageTypes) => {
  return (
    <div>
        <SelectedExerciseContextProvider>
          <SearchComponent exerciseList={exerciseList} exercises={exercises}/>
        </SelectedExerciseContextProvider>
    </div>
  )
}
