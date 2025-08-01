import { LocalStorageTraining, TrainingExerciseType, UserExercise } from '@/app/types'
import { AddExercise } from './AddSingleExercise'
import { LangContext } from '@/app/context/LocaleProvider'
import { useContext } from 'react'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

type SearchExercisesTypes = { 
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string,
    setPlanExercises?: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    isTrainingInProgressPage?: boolean,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageTrainingData?: LocalStorageTraining,
    setLocalStorageTrainingData?: React.Dispatch<React.SetStateAction<LocalStorageTraining>>
}
export const SearchExercisesTraining = ({allExercisesInOneArray,searchTerm,setPlanExercises,localStorageTrainingData,isTrainingInProgressPage=false,setShowExerciseList,setShowAddExercise,setLocalStorageTrainingData}:SearchExercisesTypes) => {
    let filtered:(string | UserExercise)[] = []

      const context = useContext(LangContext)
    
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
        setPlanExercises={setPlanExercises} 
        isTrainingInProgressPage={isTrainingInProgressPage} 
        setShowExerciseList={setShowExerciseList}
        setShowAddExercise={setShowAddExercise}
        localStorageTrainingData={localStorageTrainingData}
        setLocalStorageTrainingData={setLocalStorageTrainingData}
        />
  )
}

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    setPlanExercises?: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    isTrainingInProgressPage?: boolean,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageTrainingData?: LocalStorageTraining,
    setLocalStorageTrainingData?: React.Dispatch<React.SetStateAction<LocalStorageTraining>>
}
export const FilteredExercises = ({allExercisesInOneArray,setPlanExercises,isTrainingInProgressPage=false,setShowExerciseList,setShowAddExercise,localStorageTrainingData,setLocalStorageTrainingData}:FilteredExercisesTypes) => {
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
                            setPlanExercises={setPlanExercises} 
                            isTrainingInProgressPage={isTrainingInProgressPage} 
                            setShowExerciseList={setShowExerciseList}
                            setShowAddExercise={setShowAddExercise}
                            localStorageTrainingData={localStorageTrainingData}
                            setLocalStorageTrainingData={setLocalStorageTrainingData}
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
                            setPlanExercises={setPlanExercises} 
                            isTrainingInProgressPage={isTrainingInProgressPage} 
                            setShowExerciseList={setShowExerciseList}
                            setShowAddExercise={setShowAddExercise}
                            localStorageTrainingData={localStorageTrainingData}
                            setLocalStorageTrainingData={setLocalStorageTrainingData}
                            />
                    )
                }
            })}
        </div>
      )
}

