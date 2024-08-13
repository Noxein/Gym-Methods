import { ThemeContext } from '@/app/context/ThemeContext'
import { UserExercise } from '@/app/types'
import { PencilIcon, TrashIcon } from '@/app/ui/icons/ExpandIcon'
import React, { useContext } from 'react'

type ExerciseTypes = {
  exercise: UserExercise,
  setSelectedExercise:React.Dispatch<React.SetStateAction<UserExercise>>,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
} 
export const Exercise = ({exercise,setSelectedExercise,setShowEditModal,setShowDeleteModal}:ExerciseTypes) => {
  const theme = useContext(ThemeContext)

  const handleTouch = (type:string) => {
    setSelectedExercise(exercise)
    type==='edit'?setShowEditModal(true):setShowDeleteModal(true)
  }
  
  return (
    <div className={`w-full bg-[${theme?.colorPallete.secondary}] rounded-md flex gap-1 z-10`}>
        <div className={`m-1 bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] rounded-md pl-4 py-2 flex-1 text-wrap`}>
            {exercise.exercisename}
        </div>
        <Icon onClick={()=>handleTouch('edit')}>
          <PencilIcon />
        </Icon>
        <Icon sClass='mr-1' onClick={()=>handleTouch('delete')}>
          <TrashIcon />
        </Icon>
    </div>
  )
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const theme = useContext(ThemeContext)
  
  return (
  <div className={`flex justify-center items-center bg-[${theme?.colorPallete.primary}] rounded-md my-1 ${sClass} px-2 cursor-pointer`} {...rest}>
    {children}
  </div>
  )
}