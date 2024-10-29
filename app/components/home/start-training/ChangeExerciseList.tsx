import { TrainingExerciseType } from '@/app/types'
import React, { useContext } from 'react'
import { Icon } from '../../Icon'
import { LeftAngle, PlusIcon, RightTriangle } from '@/app/ui/icons/ExpandIcon'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { ModalContexts } from './ModalContexts'
import { Button } from '../../ui/Button'
import { ButtonWithIcon } from '../../ui/ButtonWithIcon'

type ChangeExerciseListTypes = {
    list?: TrainingExerciseType[],
    setExercisesLeft: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    setCurrentExercise: React.Dispatch<React.SetStateAction<TrainingExerciseType>>,
}
export const ChangeExerciseList = ({list,setExercisesLeft,setCurrentExercise}:ChangeExerciseListTypes) => {
    const modalsContext = useContext(ModalContexts)

    const handleChangeExercisesOrder = (indexToStartWith:number) => {
        if(indexToStartWith === 0) return handleCloseList()

        setExercisesLeft(pre=>{
            setCurrentExercise(pre[indexToStartWith])
            return [(pre[indexToStartWith]),...pre.slice(0,indexToStartWith),...pre.slice(indexToStartWith+1,pre.length)]
        })
        
        handleCloseList()
    }

    const handleCloseList = () => {
        modalsContext?.setShowExerciseList(false)
    }

    const handleShowModal = () => {
        modalsContext?.setShowAddExerciseModal(true)
    }
  return (
    <div className='fixed left-0 top-0 right-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
    <div className='bg-dark z-10 w-full pt-10 px-5 flex flex-col gap-2 overflow-y-auto'>
        <h1 className='text-center text-xl text-white font-semibold mb-5'>Wybierz ćwiczenie</h1>

            {list?.map((exercise,index)=>(
                <SingleExercise key={exercise.id} exerciseName={exercise.exercisename} handleChangeExercisesOrder={handleChangeExercisesOrder} index={index}/>
            ))}


        <div className='mt-5 mb-24 flex-col flex gap-2'>
            <ButtonWithIcon 
                className='flex-1'
                onClick={handleShowModal}
                buttonText='Inne ćwiczenie'
                isPrimary
                childrenIcon= {
                    <PlusIcon fill='#fff'/>
                }
            />

            <Button className='flex-1' onClick={handleCloseList}>Anuluj</Button>

        </div>
    </div>
    </div>)
}

type SingleExerciseTypes = {
    exerciseName: string,
    handleChangeExercisesOrder: (number: number) => void,
    index: number,
}

const SingleExercise = ({exerciseName,handleChangeExercisesOrder,index}:SingleExerciseTypes) => {
    return(
        <div className='bg-marmur p-[1px] rounded-lg flex items-center cursor-pointer' onClick={()=>handleChangeExercisesOrder(index)}>
            <div className='bg-dark text-white py-2 px-4 rounded-lg flex-1'>
                {exerciseName}
            </div>
            <Icon>
                <RightTriangle width='20'/>
            </Icon>
        </div>
    )
}