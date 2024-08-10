import { UserExercise } from '@/app/types'
import React, { useContext, useState } from 'react'
import { Exercise } from './Exercise'
import { ThemeContext } from '@/app/context/ThemeContext'
import { EditModal } from './EditModal'
import { DeleteModal } from './DeleteModal'

export const ListExercises = ({exercises}:{exercises:UserExercise[]}) => {
  const theme = useContext(ThemeContext)
  const[selectedExercise,setSelectedExercise] = useState<UserExercise>({exercicename:'',id:'',userid:''})
  const[showEditModal,setShowEditModal] = useState(false)
  const[showDeleteModal,setShowDeleteModal] = useState(false)
  return (
    <div className='flex flex-col gap-2 ml-2 mt-10 relative'>
        {exercises.map(exercise=>(
            <Exercise exercise={exercise} key={exercise.id} setSelectedExercise={setSelectedExercise} setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal}/>
        ))}
          <div className={`h-full absolute w-2 bg-[${theme?.colorPallete.secondary}] -z-1 left-1`}></div>
          {showEditModal && <EditModal selectedExercise={selectedExercise} setShowEditModal={setShowEditModal}/>}
          {showDeleteModal && <DeleteModal selectedExercise={selectedExercise} setShowDeleteModal={setShowDeleteModal}/>}
    </div>
  )
}
