import { ExerciseTypes, UserExercise } from '@/app/types'
import { useContext, useState } from 'react'
import { ListExercises } from './ListExercises'
import { SelectExercise } from './SelectExercise'
import { Icon } from '../../Icon'
import { LeftAngle } from '@/app/ui/icons/ExpandIcon'
import { SelectedExerciseContext } from './SelectedExerciseContext'
import { Button } from '../../ui/Button'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'
import { LangContext } from '@/app/context/LocaleProvider'

type ExerciseListTypes = {
    exerciseList: (string | UserExercise)[],
    exercises: ExerciseTypes,
}

export const ExerciseList = ({exerciseList,exercises}:ExerciseListTypes) => {
    const [searchField,setSearchField] = useState('')

    const searchExercise = useContext(SelectedExerciseContext)
    const setShowExerciseList = searchExercise?.setShowExerciseList
    const setExercise = searchExercise?.setExercise

    const hideList = () => {
        setShowExerciseList && setShowExerciseList(false)
    }

    const slectAllExercises = () => {
        setExercise && setExercise('')
        hideList()
    }

    const t = useTranslations("Home/Profile/Search")
    const u = useTranslations("Utils")

  return (
        <div className='fixed min-h-screen left-0 top-0 w-screen z-20 backdrop-blur-sm flex flex-col overflow-auto bottom-20 px-5'>
                <div className='flex items-center my-5'>
                    <button className='flex justify-center px-2' onClick={hideList}>
                        <Icon className='flex justify-center items-center'>
                            <LeftAngle height='30' width='30' fill='#D9D9D9'/>
                        </Icon>
                    </button>
                    <input type="text" placeholder={u("Search")} value={searchField} id={u("Search")} onChange={e=>setSearchField(e.target.value)} className={`flex-1 w-full text-xl py-2 px-2 bg-dark border-2 rounded-md border-marmur text-marmur`}/>
                </div>

                <Button className='mb-4 text-white bg-dark border-white' onClick={slectAllExercises}>
                    {t("AllExercises")}
                </Button>
               
                {
                    searchField
                    ?
                    <SearchExercises allExercisesInOneArray={exerciseList} searchTerm={searchField}/>
                    :
                    <div className='mb-20'>
                        <ListExercises item={exercises}/>
                    </div>
                }
        </div>
  )
}

type SearchExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
    searchTerm: string
}

export const SearchExercises = ({allExercisesInOneArray,searchTerm}:SearchExercisesTypes) => {

    const context = useContext(LangContext)
    let filtered:(string | UserExercise)[] = []
  
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
    <FilteredExercises allExercisesInOneArray={filtered} />
  )
}

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
}

export const FilteredExercises = ({allExercisesInOneArray}:FilteredExercisesTypes) => {

    const d = useTranslations('DefaultExercises')

    return (
        <div className='flex flex-col gap-2 w-full'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <SelectExercise mLeft='ml-2' isFirst={i===0} text={x.exercisename} key={i}/>
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <SelectExercise mLeft='ml-2' isFirst={i===0} text={d(x)} key={i}/>
                    )
                }
            })}
        </div>
      )
}
