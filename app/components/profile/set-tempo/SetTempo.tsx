'use client'
import React, { useContext, useState } from 'react'
import { MappedTempoExercises } from '@/app/components/profile/set-tempo/MappedTempoExercises'
import { SearchList } from './SearchList'
import { EditTempo } from './EditTempo'
import { ExerciceTypes, SelectedExerciseWithTempo, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
import { DeleteTempo } from './DeleteTempo'
import { ThemeContext } from '@/app/context/ThemeContext'

type SetTempoType = {
  exercises:ExerciceTypes,
  tempos:UserExerciseTempoReturnType,
  allExercisesInOneArray: (string | UserExercise)[],
}
export const SetTempo = ({exercises,tempos,allExercisesInOneArray}:SetTempoType) => {
  const theme = useContext(ThemeContext)
  const[searchField,setSearchField] = useState('')
  const[showEditTempoModal,setShowEditTempoModal] = useState(false)
  const[showDeleteTempoModal,setShowDeleteTempoModal] = useState(false)
  const[selectedExercise,setSelectedExercise] = useState<SelectedExerciseWithTempo>({id:'',name:'',tempo:{up:0,uphold:0,down:0,downhold:0}}) //id name 4 x tempos

  console.log(exercises,tempos)
  return (<div className='ml-2 mr-6'>
      <input type="text" 
      placeholder='Szukaj' 
      onChange={e=>setSearchField(e.target.value)} 
      className={`pl-2 w-[calc(100%-0.5rem)] ml-2 my-5 text-xl bg-[${theme?.colorPallete.primary}] border-[${theme?.colorPallete.accent}] border-2 rounded-md py-2 text-[${theme?.colorPallete.accent}]`} 
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
      <div className='mb-20'>
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
