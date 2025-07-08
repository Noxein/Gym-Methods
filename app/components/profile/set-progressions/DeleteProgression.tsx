import { Progression, SelectedExerciseWithTempo } from '@/app/types'
import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb, DeleteUserProgression } from '@/app/actions'
import { HideShowHTMLScrollbar, nameTrimmer } from '@/app/lib/utils'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { useTranslations } from 'next-intl'

type DeleteProgressionType = {
    selectedExercise?: Progression,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteProgression = ({selectedExercise,setShowDeleteTempoModal}:DeleteProgressionType) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const HandleDeleteProgression = async () => {
        setLoading(true)
        const isError = await DeleteUserProgression(selectedExercise!.id)
        if(isError && isError.error){
            setLoading(false)
            return setError(e(isError.error))
        } 
        setLoading(false)
        HandleCloseModal()
    }

    const HandleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowDeleteTempoModal(false)
    }

    const t = useTranslations("Home/Profile/Set-Progression")
    const d = useTranslations("DefaultExercises")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")

    const formattedExerciseName = selectedExercise!.exercisename === selectedExercise!.exerciseid ? d(nameTrimmer(selectedExercise!.exercisename)) : selectedExercise!.exercisename 

  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-2 mx-5 mb-20 rounded-md text-xl text-white w-full`}>
            
            <div className='text-center'>{t("AreYouSure")} <br/> <b>{formattedExerciseName}</b>?</div>

            <SmallLoaderDiv loading={loading}/>

            <ErrorDiv error={error}/>

            <div className='flex gap-2 mt-4'>
                
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>{u("Cancel")}</Button>
                <Button className='flex-1' onClick={HandleDeleteProgression} isPrimary disabled={loading}>{u("Delete")}</Button>
                
            </div>
            
        </div>
    </BlurBackgroundModal>
  )
}
