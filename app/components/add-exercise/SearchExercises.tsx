import { useContext } from 'react'
import { FilteredExercises } from './FilteredExercises'
import { UserExercise } from '@/app/types'
import { LangContext } from '@/app/context/LocaleProvider'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

type SearchExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string
}
export const SearchExercises = ({allExercisesInOneArray,searchTerm}:SearchExercisesTypes) => {
  const context = useContext(LangContext)
  let filtered:(string | UserExercise)[] = []

  const d = useTranslations('DefaultExercises')

  if(context === 'en'){
    filtered = allExercisesInOneArray.filter(x=>{
      if(typeof x === 'object'){
        return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
      }
      if(typeof x === 'string'){
        return d(nameTrimmer(x)).toLowerCase().includes(searchTerm.toLowerCase())
      }
    })
  }else{
    filtered = allExercisesInOneArray.filter(x=>{
      if(typeof x === 'object'){
        return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
      }
      if(typeof x === 'string'){
        return x.toLowerCase().includes(searchTerm.toLowerCase())
      }
    })
  }

  return (
    <FilteredExercises allExercisesInOneArray={filtered} />
  )
}
