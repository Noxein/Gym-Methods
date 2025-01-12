import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, nameTrimmer, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ExerciseType, ExerciseTypeWithHandle, HistoryExercise, Series } from '@/app/types'
import { format } from 'date-fns'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslations } from 'next-intl'
import { exercisesArr } from '@/app/lib/exercise-list'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'

type DisplayUserExercisesTypes = {
    fetchedExercises: HistoryExercise[],
    manyExercises:boolean,
    handleSearch: () => void,
    dataLength: number,
    totalItems: number,
}
export const DisplayUserExercises = ({fetchedExercises,manyExercises,handleSearch,dataLength,totalItems}:DisplayUserExercisesTypes) => {

    const t = useTranslations("Home/Profile/Search")
    
  return (
    <div className='mt-16 mx-5 mb-20'>
         <InfiniteScroll
         dataLength={dataLength}
         hasMore={!(totalItems===dataLength)}
         loader={<SmallLoaderDiv loading />} 
         next={()=>handleSearch()}
         endMessage={
            fetchedExercises.length === 0 ? <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center'>
            <p style={{ textAlign: 'center' }}>
              <b>{t("ThatsAllExercises")}</b>
            </p>
            </div> : 
            <p style={{ textAlign: 'center' }}>
              <b>{t("ThatsAllExercises")}</b>
            </p>
          }
          style={{overflow:''}}
         >
            {fetchedExercises.map((exercise,index)=>(
                <SingleExercise exercise={exercise} key={index}/>
            ))}
        </InfiniteScroll>
    </div>
  )
}

type SingleExerciseTypes = {
    exercise: HistoryExercise,
}
const SingleExercise = ({exercise}:SingleExerciseTypes) => {
    const u = useTranslations("Utils")
    const weeIndex = format(exercise.exercises[0].date!,'i') 
    const monthIndex = format(exercise.exercises[0].date!,'L')
    return(
        <div className='flex flex-col h-fit'>
            <div className='sticky flex gap-1 top-[60px] h-fit bg-green font-bold text-black px-2'>
                <span>{u("WeekFullName",{day: weeIndex})}</span>
                <span>{format(exercise.exercises[0].date!,'dd')}</span>
                <span>{u("MonthIndex",{index: monthIndex})}</span>
                <span className='ml-auto'>{format(exercise.exercises[0].date!,'yyyy')}</span>
            </div>
            <div className='flex flex-col my-1'>
                {exercise.exercises.map(exercise=>(
                    <ExercisesMap exercise={exercise} key={exercise.id}/>
                ))}
            </div>
        </div>
    )
}

type ExercisesMapType = {
    exercise: ExerciseTypeWithHandle,
}

const ExercisesMap = ({exercise}:ExercisesMapType) => {

    const d = useTranslations("DefaultExercises")
    const formattedName = exercisesArr.includes(exercise.exercisename) ? d(nameTrimmer(exercise.exercisename)) : exercise.exercisename

    return (
        <div className='bg-darkLight my-1 rounded-lg'>
            <div className={`text-marmur flex justify-between px-2 font-bold`}> 
                <span className='mt-2 ml-2 text-l pb-2'>
                    {formattedName} {exercise.handlename && "- " + exercise.handlename + " handle"}
                </span>
            </div>

            <div className='pb-2 pt-1 px-2 flex flex-col gap-1'>
                {exercise.sets.map((set,index)=>(
                    <SingleSet set={set} key={index}/>
                ))}
            </div>
        </div>
    )
}
type SingleSetType = {
    set: Series
}
const SingleSet = ({set}:SingleSetType) => {

    const u = useTranslations("Utils")

    return(
        <div className='flex pr-2'>
            <SpanElement additionalText={u(set.side)}/>
            <SpanElement text={set.weight} additionalText='kg'/>
            {
            set.time?<SpanElement text={set.time} additionalText={u("Time")}/>:
            <SpanElement text={set.repeat} additionalText={'x'}/>
            }
            <SpanElement additionalText={set.difficulty && u(set.difficulty.charAt(0).toUpperCase() + set.difficulty.slice(1))}/>
        </div>
    )
}

const SpanElement = ({text,additionalText}:{text?:string|number,additionalText?:string}) => {
    return(
        <span className='flex-1 text-right pr-2'>
            <span className='font-semibold'>{text}</span> <span className='font-normal'>{additionalText}</span>
        </span>
    )
} 