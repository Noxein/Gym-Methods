import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { UserExercise } from '@/app/types'
import { DeleteUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { useTranslations } from 'next-intl'

export const DeleteModal = ({selectedExercise,setShowDeleteModal}:{selectedExercise:UserExercise,setShowDeleteModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const[error,setError]= useState('')
    const[loading,setLoading] = useState(false)

    const deleteExercise = async () => {
        setLoading(true)
        const isError = await DeleteUserExercise(selectedExercise.id)
        if(isError && isError.error){
            setLoading(false)
            return setError(e(isError.error))
        } 
        HandleCloseModal()
        setLoading(false)
    }
    const HandleCloseModal = () => {
        if(loading) return
        HideShowHTMLScrollbar('show')
        setShowDeleteModal(false)
    }
    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/My-Exercises")
    const e = useTranslations("Errors")
    
    return (
    <BlurBackgroundModal>
        <div  className={`text-white px-5 py-6 rounded-md text-xl flex flex-col gap-2 w-full`}>
            <div className='text-center'>
                {t("AreYouSure")} <br />
                <strong>{selectedExercise.exercisename}</strong>
            </div>

            <SmallLoaderDiv loading={loading}/>

            <div className='flex gap-2'>

                <Button onClick={HandleCloseModal} className='flex-1' disabled={loading}>{u("Cancel")}</Button>
                <Button onClick={deleteExercise} className='flex-1' isPrimary disabled={loading}>{u("Delete")}</Button>
                
            </div>
            
            <ErrorDiv error={error}/>
        </div>
    </BlurBackgroundModal>
  )
}
