'use client'
import { ExerciseTypes, Progression, UserExercise } from '@/app/types'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { SearchProgressionList } from './SearchProgressionList'
import { MappedProgressionExercises } from './MappedProgressionExercises'
import { EditProgression } from './EditProgression'
import { DeleteProgression } from './DeleteProgression'

type SetProgressionsTypes = {
  exercises:ExerciseTypes,
  progressions:Progression[],
  allExercisesInOneArray: (string | UserExercise)[],
}

export const SetProgressions = ({exercises,progressions,allExercisesInOneArray}:SetProgressionsTypes) => {
      const[searchField,setSearchField] = useState('')
      const[showEditTempoModal,setShowEditTempoModal] = useState(false)
      const[showDeleteTempoModal,setShowDeleteTempoModal] = useState(false)
      const[selectedExercise,setSelectedExercise] = useState<Progression>() //id name 4 x tempos

      const u = useTranslations("Utils")
    console.log('hey',selectedExercise)
  return (
    <div className='mx-5 mt-10'>
      <input type="text"
      placeholder={u("Search")}
      onChange={e=>setSearchField(e.target.value)}
      className={`pl-2 w-full text-xl bg-dark border-marmur border-2 rounded-md py-2 text-marmur`}
      />

      {searchField ? 
      <SearchProgressionList 
        searchTerm={searchField} 
        allExercisesInOneArray={allExercisesInOneArray}
        progressions={progressions}
        setSelectedExercise={setSelectedExercise} 
        setShowEditTempoModal={setShowEditTempoModal} 
        setShowDeleteTempoModal={setShowDeleteTempoModal}/> 
      :
      <div className='mb-20 mt-5'>
        <MappedProgressionExercises 
          item={exercises}
          progressions={progressions}
          setSelectedExercise={setSelectedExercise} 
          setShowEditTempoModal={setShowEditTempoModal} 
          setShowDeleteTempoModal={setShowDeleteTempoModal}/>
      </div>}

      {showEditTempoModal && 
      <EditProgression 
        selectedExerciseProgression={selectedExercise}
        setShowEditTempoModal={setShowEditTempoModal}
        progressions={progressions}/>}
        

      {showDeleteTempoModal && 
      <DeleteProgression 
        selectedExercise={selectedExercise} 
        setShowDeleteTempoModal={setShowDeleteTempoModal}/>}

    </div>
  )
}
