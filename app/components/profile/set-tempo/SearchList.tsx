import React from 'react'
import { FilteredTempos } from './FilteredTempos'
import { SelectedExerciseWithTempo, UserExercise, UserExerciseTempoReturnType } from '@/app/types'

type SearchListType = {
  searchTerm:string
  allExercisesInOneArray: (string | UserExercise)[],
  tempos:UserExerciseTempoReturnType,
  setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
  setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const SearchList = ({searchTerm,allExercisesInOneArray,tempos,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:SearchListType) => {
  const filtered = allExercisesInOneArray.filter(x=>{
    if(typeof x === 'object'){
      return x.exercisename.toLowerCase().includes(searchTerm.toLowerCase())
    }
    if(typeof x === 'string'){
      return x.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })
  return (
    <div className='text-white mb-20'>
      <FilteredTempos filteredExercises={filtered} tempos={tempos} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
    </div>
  )
}
