import { useContext } from 'react'
import { FilteredProgressions } from './FilteredProgressions'
import { Progression, SelectedExerciseWithTempo, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
import { LangContext } from '@/app/context/LocaleProvider'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

type SearchListType = {
  searchTerm:string
  allExercisesInOneArray: (string | UserExercise)[],
  progressions:Progression[],
  setSelectedExercise: React.Dispatch<React.SetStateAction<Progression|undefined>>,
  setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const SearchProgressionList = ({searchTerm,allExercisesInOneArray,progressions,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:SearchListType) => {

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
    <div className='text-white mb-20'>
      <FilteredProgressions filteredExercises={filtered} progressions={progressions} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
    </div>
  )
}
