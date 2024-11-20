import { UserExercise } from '@/app/types'
import { LinkToExercise } from './LinkToExercise'
import { useTranslations } from 'next-intl'

type FilteredExercisesTypes = {
    allExercisesInOneArray: (string | UserExercise)[],
}
export const FilteredExercises = ({allExercisesInOneArray}:FilteredExercisesTypes) => {
    const d = useTranslations("DefaultExercises")
    return (
        <div className='flex flex-col gap-2 w-full'>
            {allExercisesInOneArray.map((x,i)=>{
                if(typeof x === 'object'){
                    return (
                        <LinkToExercise mLeft='ml-2' isFirst={i===0} text={x.exercisename} key={i} leadTo={x.exercisename}/>
                    )
                }
                if(typeof x === 'string'){
                    return (
                        <LinkToExercise mLeft='ml-2' isFirst={i===0} text={d(x.replace(/ /g,'').replace(/'/g,''))} key={i} leadTo={x}/>
                    )
                }
            })}
        </div>
      )
}