import { SelectedExerciseWithTempo, TempoType, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
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
    <div className='flex flex-col gap-2'>
        {filteredExercises.map((x,i)=>{
            if(typeof x === 'object'){
                return (
                    <SingleExercise key={x.id} exerciceid={x.id} mLeft='' isFirst={i===0} text={x.exercisename} tempo={tempos[x.id]?tempos[x.id].tempo:defaultTempo} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                )
            }
            if(typeof x === 'string'){
                return (
                    <SingleExercise key={x} exerciceid={x} mLeft='' isFirst={i===0} text={x} tempo={tempos[x]?tempos[x].tempo:defaultTempo} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                )
            }
        })}
    </div>
  )
}
