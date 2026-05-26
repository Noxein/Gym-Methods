import { SearchComponent } from './SearchComponent'
import { ExerciseTypes, UserExercise } from '@/app/types'
import { SelectedExerciseContextProvider } from './SelectedExerciseContext'

type SearchPageTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
    traineeId?: string,
    children?: React.ReactNode
}
export const SearchPage = ({exerciseList,exercises,traineeId,children}:SearchPageTypes) => {
  return (
    <div>
        <SelectedExerciseContextProvider>
          <SearchComponent exerciseList={exerciseList} exercises={exercises} traineeId={traineeId}>
            {children}
          </SearchComponent>
        </SelectedExerciseContextProvider>
    </div>
  )
}
