import { Icon } from '@/app/components/Icon';
import { exercisesArr } from '@/app/lib/exercise-list';
import { localStorageSetter, nameTrimmer } from '@/app/lib/utils';
import { LocalStorageTraining, TrainingExerciseType } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon';
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';

type AddExerciseType = {
    text:string,
    mLeft:string,
    isFirst:boolean,
    id:string,
    setPlanExercises?: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    isTrainingInProgressPage?: boolean,
    setCurrentExercise?: React.Dispatch<React.SetStateAction<number>>,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageTrainingData?: LocalStorageTraining,
    setLocalStorageTrainingData?: React.Dispatch<React.SetStateAction<LocalStorageTraining>>
}
export const AddExercise = ({text,mLeft,isFirst,id,setPlanExercises,isTrainingInProgressPage=false,setCurrentExercise,setShowExerciseList,setShowAddExercise,localStorageTrainingData,setLocalStorageTrainingData}:AddExerciseType) => {
    const addExercise = () => {
        if(isTrainingInProgressPage && localStorageTrainingData){
            setCurrentExercise && setCurrentExercise(x=>x)
            setPlanExercises && setPlanExercises(x=>{
                if(x) return [{exerciseid:id,exercisename:text,id:uuidv4()},...x]
                return [{exerciseid:id,exercisename:text,id:uuidv4()}]
            })
            let localStorageTrainingDataCopy = {...localStorageTrainingData}
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            localStorageTrainingDataCopy.currentExerciseIndex = localStorageTrainingDataCopy.exercises.length

                localStorageTrainingDataCopy.exercises.push({
                    exerciseId:id,
                    id: String(localStorageTrainingDataCopy.exercises.length),
                    exerciseName: text,
                    sets: [],
                })
                localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)

            setLocalStorageTrainingData && setLocalStorageTrainingData(localStorageTrainingDataCopy)
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            setShowExerciseList && setShowExerciseList(false)
            setShowAddExercise && setShowAddExercise(false)
            return
        }
        // const 
        // here add shit
        setPlanExercises && setPlanExercises(x=>{
            if(x) return [...x,{exerciseid:id,exercisename:text,id:uuidv4()}]
            return [{exerciseid:id,exercisename:text,id:uuidv4()}]
        })
    }

    const d = useTranslations("DefaultExercises")
    const newName = exercisesArr.includes(text) ? d(nameTrimmer(text)) : text
    return(
        <button className={`text-left ${mLeft} bg-borderInteractive text-marmur py-[2px] pl-[2px] rounded flex items-center justify-between ${isFirst?'mt-2':null}`} 
        onClick={addExercise}
        >
            <span className={`flex-1 bg-dark rounded-md pl-4 py-3 flex flex-col`}>
                {newName}
            </span>
            <Icon className='px-2'>
                <PlusIcon width='20px' fill='#fff'/>
            </Icon>
        </button>
    )
}