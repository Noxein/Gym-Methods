'use client'
import React, { useState } from 'react'
import { MappedTempoExercises } from '@/app/components/profile/set-tempo/MappedTempoExercises'
import { SearchList } from './SearchList'
import { EditTempo } from './EditTempo'
import { ExerciseTypes, SelectedExerciseWithTempo, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
import { DeleteTempo } from './DeleteTempo'
import { useTranslations } from 'next-intl'

type SetTempoType = {
  exercises:ExerciseTypes,
  tempos:UserExerciseTempoReturnType,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const SetTempo = ({exercises,tempos,allExercisesInOneArray}:SetTempoType) => {
  const[searchField,setSearchField] = useState('')
  const[showEditTempoModal,setShowEditTempoModal] = useState(false)
  const[showDeleteTempoModal,setShowDeleteTempoModal] = useState(false)
  const[selectedExercise,setSelectedExercise] = useState<SelectedExerciseWithTempo>({id:'',name:'',tempo:{up:0,uphold:0,down:0,downhold:0}}) //id name 4 x tempos

  const u = useTranslations("Utils")

  return (<div className='mx-5 mt-10'>
      <input type="text"
      placeholder={u("Search")}
      onChange={e=>setSearchField(e.target.value)}
      className={`pl-2 w-full text-xl bg-dark border-marmur border-2 rounded-md py-2 text-marmur`}
      />

      {searchField ? 
      <SearchList 
        searchTerm={searchField} 
        allExercisesInOneArray={allExercisesInOneArray} 
        tempos={tempos} 
        setSelectedExercise={setSelectedExercise} 
        setShowEditTempoModal={setShowEditTempoModal} 
        setShowDeleteTempoModal={setShowDeleteTempoModal}/> 
      :
      <div className='mb-20 mt-5'>
        <MappedTempoExercises 
          item={exercises} 
          tempos={tempos} 
          setSelectedExercise={setSelectedExercise} 
          setShowEditTempoModal={setShowEditTempoModal} 
          setShowDeleteTempoModal={setShowDeleteTempoModal}/>
      </div>}

      {showEditTempoModal && 
      <EditTempo 
        selectedExercise={selectedExercise} 
        setShowEditTempoModal={setShowEditTempoModal}/>}

      {showDeleteTempoModal && 
      <DeleteTempo 
        selectedExercise={selectedExercise} 
        setShowDeleteTempoModal={setShowDeleteTempoModal}/>}

    </div>
  )
}
