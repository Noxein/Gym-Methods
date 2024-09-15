import { TrainingExerciseType } from '@/app/types'
import React from 'react'
import { Icon } from '../../Icon'
import { LeftAngle, PlusIcon, RightTriangle } from '@/app/ui/icons/ExpandIcon'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'

type ChangeExerciseListTypes = {
    list?: TrainingExerciseType[],
    closeList: React.Dispatch<React.SetStateAction<boolean>>,
    setExercisesLeft: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    setCurrentExercise: React.Dispatch<React.SetStateAction<TrainingExerciseType>>,
    setShowAddExerciseModal: React.Dispatch<React.SetStateAction<boolean>>,
}
export const ChangeExerciseList = ({list,closeList,setExercisesLeft,setCurrentExercise,setShowAddExerciseModal}:ChangeExerciseListTypes) => {

    const handleChangeExercisesOrder = (indexToStartWith:number) => {
        if(indexToStartWith === 0) return handleCloseList()

        setExercisesLeft(pre=>{
            setCurrentExercise(pre[indexToStartWith])
            return [(pre[indexToStartWith]),...pre.slice(0,indexToStartWith),...pre.slice(indexToStartWith+1,pre.length)]
        })
        
        handleCloseList()
    }

    const handleCloseList = () => {
        closeList(false)
    }

    const handleShowModal = () => {
        setShowAddExerciseModal(true)
    }
  return (
    <div className='fixed left-0 top-0 right-0 w-screen z-20 backdrop-blur-sm flex justify-center overflow-auto bottom-20'>
    <div className='bg-dark z-10 w-full pt-10 px-5 flex flex-col gap-2 overflow-y-auto'>
        <h1 className='text-center text-xl text-white font-semibold mb-5'>Wybierz ćwiczenie</h1>

            {list?.map((exercise,index)=>(
                <SingleExercise key={exercise.id} exerciseName={exercise.exercisename} handleChangeExercisesOrder={handleChangeExercisesOrder} index={index}/>
            ))}


        <div className='mt-5 mb-24 flex flex-col gap-2'>
            <div className='bg-green p-[1px] rounded-lg flex items-center cursor-pointer' onClick={handleShowModal}>
                <div className='bg-green text-white py-2 px-4 rounded-lg flex-1'>
                    Inne ćwiczenie
                </div>
                <Icon>
                    <PlusIcon fill='#fff'/>
                </Icon>
            </div>
            <button className='bg-red text-white flex-1 w-full rounded-lg py-3' onClick={handleCloseList}>Anuluj</button>
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