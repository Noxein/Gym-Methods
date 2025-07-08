import { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateTempo } from '@/app/actions'
import { HideShowHTMLScrollbar, nameTrimmer } from '@/app/lib/utils'
import { Input } from '../../ui/Input'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'
import { useTranslations } from 'next-intl'

type EditTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditTempo = ({selectedExercise,setShowEditTempoModal}:EditTempoType) => {
    const[tempos,setTempos] = useState(selectedExercise.tempo)
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const handleTempoChange = (value:number,target:'up'|'uphold'|'down'|'downhold') => {
        let tempoCopy = {...tempos}
        tempoCopy[target] = value
        setTempos(tempoCopy)
    }
    const HandleAddOrUpdateTempo = async () => {
        setLoading(true)
        const isError = await AddOrUpdateTempo(selectedExercise.id,tempos)
        if(isError && isError.error){
            setLoading(false)
            return setError(e(isError.error))
        } 
        setShowEditTempoModal(false)
        setLoading(false)
    }
    const HandleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowEditTempoModal(false)
    }

    const t = useTranslations("Home/Profile/Set-Tempo")
    const d = useTranslations("DefaultExercises")
    const u = useTranslations("Utils")
    const e = useTranslations("Errors")
    
    const formattedExerciseName = selectedExercise.name === selectedExercise.id ? d(nameTrimmer(selectedExercise.name)) : selectedExercise.name 
  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-4 text-xl mx-5 mb-20 py-5 text-white rounded-md w-full`}>
            <div className='text-center pb-2'>{formattedExerciseName}</div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <Input className='flex-1' labelName={t("TempoUp")} onChange={(e)=>handleTempoChange(Number(e.target.value),'up')} value={tempos.up}/>
                    <Input className='flex-1' labelName={t("UpHold")} onChange={(e)=>handleTempoChange(Number(e.target.value),'uphold')} value={tempos.uphold}/>
                    <Input className='flex-1' labelName={t("TempoDown")} onChange={(e)=>handleTempoChange(Number(e.target.value),'down')} value={tempos.down}/>
                    <Input className='flex-1' labelName={t("DownHold")} onChange={(e)=>handleTempoChange(Number(e.target.value),'downhold')} value={tempos.downhold}/>
                </div>
            </div>
            
            <SmallLoaderDiv loading={loading}/>
                
            <div className='flex gap-4 mt-2'>
                
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>{u("Cancel")}</Button>
                <Button className='flex-1' onClick={HandleAddOrUpdateTempo} isPrimary disabled={loading}>{u("Save")}</Button>
                
            </div>
            {error && <div className='text-red-600'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}