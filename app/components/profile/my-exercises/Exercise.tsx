import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { UserExercise } from '@/app/types'
import { PencilIcon, TrashIcon } from '@/app/ui/icons/ExpandIcon'

type ExerciseTypes = {
  exercise: UserExercise,
  setSelectedExercise:React.Dispatch<React.SetStateAction<UserExercise>>,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
} 
export const Exercise = ({exercise,setSelectedExercise,setShowEditModal,setShowDeleteModal}:ExerciseTypes) => {

  const handleTouch = (type:string) => {
    setSelectedExercise(exercise)
    HideShowHTMLScrollbar('hide')
    type==='edit'?setShowEditModal(true):setShowDeleteModal(true)
  }
  
  return (
    <div className={`w-full bg-marmur p-[1px] rounded-lg flex`}>
          <div className={`bg-dark text-marmur rounded-lg flex-1 text-wrap py-2 pl-2`}>
              {exercise.exercisename}
          </div>
          <Icon onClick={()=>handleTouch('edit')}>
            <PencilIcon />
          </Icon>
          <Icon onClick={()=>handleTouch('delete')}>
            <TrashIcon />
          </Icon>
    </div>
  )
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  
  return (
  <div className={`flex justify-center items-center rounded-md ${sClass} px-2 cursor-pointer`} {...rest}>
    {children}
  </div>
  )
}