import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { AddNewUserExercise } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { CheckBox } from '../../ui/CheckBox'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { useTranslations } from 'next-intl'

export const AddExercise = ({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const[exerciseName,setExerciseName] = useState('')

    const[timeExercise,setTimeExercise] = useState(false)
    const[usesHandle,setUsesHandle] = useState(false)

    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const hideModal = () => {
        setShowModal(x=>!x)
        HideShowHTMLScrollbar('show')
    }
    const addExercise = async () => {
        setLoading(true)
        const isError = await AddNewUserExercise(exerciseName,timeExercise,usesHandle)
        if(isError && isError.error){
            setLoading(false)
            return setError(e(isError.error))
        }
        setLoading(false)
        hideModal()
    }

    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/My-Exercises")
    const e = useTranslations("Errors")

  return (
        <BlurBackgroundModal>
            <div className={`rounded-md flex flex-col px-10 py-4 gap-4 text-xl mb-20 w-full mx-5 text-white`} onClick={e=>e.stopPropagation()}>
                <Input labelName={t("ExerciseName")} value={exerciseName} onChange={e=>setExerciseName(e.target.value)} disabled={loading}/>
                <ErrorDiv error={error}/>

                <CheckBox labelText={t("IsTimingExercise")} onChange={e=>setTimeExercise(e.target.checked)} checked={timeExercise} disabled={loading}/>
                <CheckBox labelText={t("UsesHandleExercise")} onChange={e=>setUsesHandle(e.target.checked)} checked={usesHandle} disabled={loading}/>
                
                <SmallLoaderDiv loading={loading}/>
                <div className='flex justify-around text-white gap-2'>

                    <Button onClick={hideModal} className='flex-1' disabled={loading}>{u("Cancel")}</Button>
                    <Button onClick={addExercise} isPrimary className='flex-1' disabled={loading}>{u("Add")}</Button>
                    
                </div>

                
            </div>
        </BlurBackgroundModal>
  )
}
