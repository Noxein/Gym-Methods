import { Progression, SelectedExerciseWithTempo, TempoType, UserExercise, UserExerciseTempoReturnType } from '@/app/types'
import { SingleExercise } from './SingleExercise'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

const defaultTempo = {
    up:0,
    uphold:0,
    down:0,
    downhold:0
} satisfies TempoType

type FilteredProgressionsTypes = {
    filteredExercises: (string | UserExercise)[],
    progressions:Progression[],
    setSelectedExercise: React.Dispatch<React.SetStateAction<Progression|undefined>>,
    setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const FilteredProgressions = ({filteredExercises,progressions,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:FilteredProgressionsTypes) => {
    const d = useTranslations("DefaultExercises")
  return (
    <div className='flex flex-col gap-2'>
        {filteredExercises.map((x,i)=>{
            if(typeof x === 'object'){
                return (
                    <SingleExercise key={x.id} exerciceid={x.id} mLeft='' isFirst={i===0} text={x.exercisename} translatedText={x.exercisename} progression={progressions.find(y=>y.exercisename===x.exercisename)!} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal} progressions={progressions}/>
                )
            }
            if(typeof x === 'string'){
                return (
                    <SingleExercise key={x} exerciceid={x} mLeft='' isFirst={i===0} translatedText={d(nameTrimmer(x))} text={x} progression={progressions.find(y=>y.exercisename===x)!} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal} progressions={progressions}/>
                )
            }
        })}
    </div>
  )
}
