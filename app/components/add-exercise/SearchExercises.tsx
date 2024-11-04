import { FilteredExercises } from './FilteredExercises'
import { UserExercise } from '@/app/types'

type SearchExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string
}
export const SearchExercises = ({allExercisesInOneArray,searchTerm}:SearchExercisesTypes) => {
    const filtered = allExercisesInOneArray.filter(x=>{
        if(typeof x === 'object'){
          return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
        }
        if(typeof x === 'string'){
          return x.toLowerCase().includes(searchTerm.toLowerCase())
        }
      })
  return (
    <FilteredExercises allExercisesInOneArray={filtered} />
  )
}
