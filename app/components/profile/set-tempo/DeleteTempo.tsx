import { SelectedExerciseWithTempo } from '@/app/types'
import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { DeleteTempoFromDb } from '@/app/actions'
import { HideShowHTMLScrollbar, nameTrimmer } from '@/app/lib/utils'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'
import { ErrorDiv } from '../../ui/ErrorDiv'
import { useTranslations } from 'next-intl'

type DeleteTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteTempo = ({selectedExercise,setShowDeleteTempoModal}:DeleteTempoType) => {
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const HandleDeleteTempo = async () => {
        setLoading(true)
        const isError = await DeleteTempoFromDb(selectedExercise.id)
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

    const t = useTranslations("Home/Profile/Set-Tempo")
    const d = useTranslations("DefaultExercises")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")

    const formattedExerciseName = selectedExercise.name === selectedExercise.id ? d(nameTrimmer(selectedExercise.name)) : selectedExercise.name 

  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-2 mx-5 mb-20 rounded-md text-xl text-white w-full`}>
            
            <div className='text-center'>{t("AreYouSure")} <br/> <b>{formattedExerciseName}</b>?</div>

            <SmallLoaderDiv loading={loading}/>

            <ErrorDiv error={error}/>

            <div className='flex gap-2 mt-4'>
                
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>{u("Cancel")}</Button>
                <Button className='flex-1' onClick={HandleDeleteTempo} isPrimary disabled={loading}>{u("Delete")}</Button>
                
            </div>
            
        </div>
    </BlurBackgroundModal>
  )
}
