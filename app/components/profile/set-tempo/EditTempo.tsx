import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateTempo } from '@/app/actions'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { Input } from '../../ui/Input'
import { SmallLoaderDiv } from '../../ui/SmallLoaderDiv'
import { Button } from '../../ui/Button'

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
            setLoading(true)
            return setError(isError.error)
        } 
        setShowEditTempoModal(false)
        setLoading(false)
    }
    const HandleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowEditTempoModal(false)
    }
  return (
    <BlurBackgroundModal>
        <div className={`flex flex-col gap-4 text-xl mx-5 mb-20 py-5 text-white rounded-md w-full`}>
            <div className='text-center pb-2'>{selectedExercise.name}</div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <Input className='flex-1' labelName='Tempo Góra' onChange={(e)=>handleTempoChange(Number(e.target.value),'up')} value={tempos.up}/>
                    <Input className='flex-1' labelName='Wstrzymanie Góra' onChange={(e)=>handleTempoChange(Number(e.target.value),'uphold')} value={tempos.uphold}/>
                    <Input className='flex-1' labelName='Tempo Dół' onChange={(e)=>handleTempoChange(Number(e.target.value),'down')} value={tempos.down}/>
                    <Input className='flex-1' labelName='Wstrzymanie Dół' onChange={(e)=>handleTempoChange(Number(e.target.value),'downhold')} value={tempos.downhold}/>
                </div>
            </div>
            
            <SmallLoaderDiv loading={loading}/>
                
            <div className='flex gap-4 mt-2'>
                
                <Button className='flex-1' onClick={HandleCloseModal} disabled={loading}>Anuluj</Button>
                <Button className='flex-1' onClick={HandleAddOrUpdateTempo} isPrimary disabled={loading}>Zapisz</Button>
                
            </div>
            {error && <div className='text-red-600'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}