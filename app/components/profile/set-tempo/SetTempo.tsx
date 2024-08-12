'use client'
import React, { useState } from 'react'
import { MappedTempoExercises } from '@/app/components/profile/set-tempo/MappedTempoExercises'
import { SearchList } from './SearchList'
import { EditTempo } from './EditTempo'
import { ExerciceTypes, SelectedExerciseWithTempo, UserExerciseTempoReturnType } from '@/app/types'
import { DeleteTempo } from './DeleteTempo'

export const SetTempo = ({exercises,tempos}:{exercises:ExerciceTypes,tempos:UserExerciseTempoReturnType}) => {
  const[searchField,setSearchField] = useState('')
  const[showEditTempoModal,setShowEditTempoModal] = useState(false)
  const[showDeleteTempoModal,setShowDeleteTempoModal] = useState(false)
  const[selectedExercise,setSelectedExercise] = useState<SelectedExerciseWithTempo>({id:'',name:'',tempo:{up:0,uphold:0,down:0,downhold:0}}) //id name 4 x tempos

  return (<div className='ml-2 mr-6'>
    <input type="text" onChange={e=>setSearchField(e.target.value)} />
      {searchField ? <SearchList searchTerm={searchField}/>: <div className='mb-20'><MappedTempoExercises item={exercises} tempos={tempos} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/></div>}

      {showEditTempoModal && <EditTempo selectedExercise={selectedExercise} setShowEditTempoModal={setShowEditTempoModal}/>}
      {showDeleteTempoModal && <DeleteTempo selectedExercise={selectedExercise} setShowDeleteTempoModal={setShowDeleteTempoModal}/>}
    </div>
  )
}
