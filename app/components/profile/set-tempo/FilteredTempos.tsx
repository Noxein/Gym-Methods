import { SelectedExerciseWithTempo, TempoType, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
import React from 'react'
import { SingleExercise } from './SingleExercise'

const defaultTempo = {
    up:0,
    uphold:0,
    down:0,
    downhold:0
} satisfies TempoType

type filteredTemposType = {
    filteredExercises: (string | UserExercise)[],
    tempos:UserExerciseTempoReturnType,
    setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
    setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const FilteredTempos = ({filteredExercises,tempos,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:filteredTemposType) => {
  return (
    <div className='mx-auto flex flex-col gap-2'>
        {filteredExercises.map((x,i)=>{
            if(typeof x === 'object'){
                return (
                    <SingleExercise exerciceid={x.id} mLeft='ml-2' isFirst={i===0} text={x.exercisename} tempo={tempos[x.id]?tempos[x.id].tempo:defaultTempo} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                )
            }
            if(typeof x === 'string'){
                return (
                    <SingleExercise exerciceid={x} mLeft='ml-2' isFirst={i===0} text={x} tempo={tempos[x]?tempos[x].tempo:defaultTempo} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                )
            }
        })}
    </div>
  )
}