import { LocalStorageExercise, LocalStorageTraining } from '@/app/types'
import { useContext, useState } from 'react'
import { Icon } from '../../Icon'
import { PlusIcon, TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ButtonWithIcon } from '../../ui/ButtonWithIcon'
import { localStorageSetter, nameTrimmer } from '@/app/lib/utils'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { useTranslations } from 'next-intl'
import { exercisesArr } from '@/app/lib/exercise-list'

type ChangeExerciseListTypes = {
    list2?: LocalStorageExercise[],
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}
export const ChangeExerciseList = ({list2,setLocalStorageTrainingData}:ChangeExerciseListTypes) => {
    const modalsContext = useContext(ModalContexts)
    const[error,setError] = useState('')

    const handleChangeExercisesOrder = (exerciseIndexNumber:number) => {

        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.currentExerciseIndex = exerciseIndexNumber
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
        
        handleCloseList()
    }

    const handleCloseList = () => {
        modalsContext?.setShowExerciseList(false)
    }

    const handleShowModal = () => {
        modalsContext?.setShowAddExerciseModal(true)
    }

    const handleDeleteExercise = (index: number) => {
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            if(xCopy.exercises.length === 1){
                setError('Trening musi mieć conajmniej jendo ćwiczenie')
                return xCopy
            } 

            if(xCopy.exercises.length - 1 === xCopy.currentExerciseIndex){
                xCopy.currentExerciseIndex = xCopy.exercises.length - 2
            }
            xCopy.exercises = xCopy.exercises.filter((x,i)=>i!==index)
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }

    const t = useTranslations("Home/Start-Training/[TrainingName]")
    const u = useTranslations("Utils")

  return (
    <div className='fixed left-0 top-0 right-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
    <div className='bg-dark z-10 w-full pt-10 px-5 flex flex-col gap-2 overflow-y-auto'>
        <h1 className='text-center text-xl text-white font-semibold mb-5'>{t("SelectExercise")}</h1>

            {list2?.map((exercise,index)=>(
                <SingleExercise key={exercise.id} exerciseName={exercise.exerciseName} handleChangeExercisesOrder={handleChangeExercisesOrder} handleDeleteExercise={handleDeleteExercise} index={index}/>
            ))}

            <ErrorDiv error={error}/>

        <div className='mt-5 mb-24 flex-col flex gap-2'>
            <ButtonWithIcon 
                className='flex-1'
                onClick={handleShowModal}
                buttonText={t("DiffrentExercise")}
                isPrimary
                childrenIcon= {
                    <PlusIcon fill='#fff'/>
                }
            />

            <Button className='flex-1' onClick={handleCloseList}>{u("Cancel")}</Button>

        </div>
    </div>
    </div>)
}

type SingleExerciseTypes = {
    exerciseName: string,
    handleChangeExercisesOrder: (number: number) => void,
    index: number,
    handleDeleteExercise: (index: number) => void 
}

const SingleExercise = ({exerciseName,handleChangeExercisesOrder,index,handleDeleteExercise}:SingleExerciseTypes) => {

    const d = useTranslations("DefaultExercises")

    const formattedExerciseName = exercisesArr.includes(exerciseName) ? d(nameTrimmer(exerciseName)) : exerciseName
    return(
        <div className='bg-borderInteractive p-[2px] rounded-lg flex items-center cursor-pointer' onClick={()=>handleChangeExercisesOrder(index)}>
            <div className='bg-dark text-white py-3 px-4 rounded-lg flex-1'>
                {formattedExerciseName}
            </div>
            <Icon onClick={(e)=>{e.stopPropagation();handleDeleteExercise(index)}}>
                <TrashIcon width='25' height='25' fill='#fff'/>
            </Icon>
        </div>
    )
}