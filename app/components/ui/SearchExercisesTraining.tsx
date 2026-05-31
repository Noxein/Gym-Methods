import { TempoType, UserExercise } from '@/app/types'
import  LocaleContext  from '@/app/context/LocaleContext'
import { useContext } from 'react'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'
import { exercisesArr } from '@/app/lib/exercise-list'
import { Icon } from '../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ExerciseTempo } from './ExerciseTempo'

type SearchExercisesTypes = { 
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string,
    handleSelect: (id:string, name?:string) => void;
    tempos: {[key: string]: {id: string, tempo: TempoType}},
}
export const SearchExercisesTraining = ({allExercisesInOneArray,searchTerm,handleSelect,tempos}:SearchExercisesTypes) => {
    let filtered:(string | UserExercise)[] = []

      const context = useContext(LocaleContext)
    
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
    <FilteredExercises 
        allExercisesInOneArray={filtered}
        handleSelect={handleSelect}
        tempos={tempos}
        />
  )
}

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    handleSelect: (id:string, name?:string) => void,
    tempos: {[key: string]: {id: string, tempo: TempoType}},
}
export const FilteredExercises = ({allExercisesInOneArray,handleSelect,tempos}:FilteredExercisesTypes) => {
    const d = useTranslations("DefaultExercises")
    return (
        <div className='flex flex-col gap-2 mx-3'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <AddExercise 
                            mLeft='ml-2' 
                            key={x.id} 
                            isFirst={i===0} 
                            text={x.exercisename} 
                            id={x.id}
                            handleSelect={handleSelect}
                            tempo={tempos[x.id]?.tempo}
                            />
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <AddExercise 
                            mLeft='ml-2' 
                            key={x} 
                            isFirst={i===0} 
                            text={x} 
                            id={x}
                            handleSelect={handleSelect}
                            tempo={tempos[x]?.tempo}
                            />
                    )
                }
            })}
        </div>
      )
}

type AddExerciseType = {
    text:string,
    mLeft:string,
    isFirst:boolean,
    id:string,
    handleSelect: (id:string, name?:string) => void,
    tempo?: TempoType,
}
export const AddExercise = ({text,mLeft,isFirst,id,handleSelect,tempo}:AddExerciseType) => {

    const d = useTranslations("DefaultExercises")
    const newName = exercisesArr.includes(text) ? d(nameTrimmer(text)) : text
    return(
        <button className={`text-left ${mLeft} bg-borderInteractive text-marmur py-[2px] pl-[2px] rounded flex items-center justify-between ${isFirst?'mt-2':null}`} 
        onClick={()=>handleSelect(id, text)}
        >
            <span className={`flex-1 bg-dark rounded-md pl-4 py-3 flex flex-col`}>
                {newName}
                <ExerciseTempo tempo={tempo} className='mt-1'/>
            </span>
            <Icon className='px-2'>
                <PlusIcon width='20px' fill='#fff'/>
            </Icon>
        </button>
    )
}