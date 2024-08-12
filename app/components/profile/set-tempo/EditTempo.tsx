import React, { useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateTempo } from '@/app/actions'

type EditTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditTempo = ({selectedExercise,setShowEditTempoModal}:EditTempoType) => {
    const[tempos,setTempos] = useState(selectedExercise.tempo)
    const[error,setError] = useState('')
    const handleTempoChange = (value:number,target:'up'|'uphold'|'down'|'downhold') => {
        let tempoCopy = {...tempos}
        tempoCopy[target] = value
        setTempos(tempoCopy)
    }
    const HandleAddOrUpdateTempo = async () => {
        const isError = await AddOrUpdateTempo(selectedExercise.id,tempos)
        if(isError && isError.error) return setError(isError.error)
        setShowEditTempoModal(false)
    }
  return (
    <BlurBackgroundModal onClick={()=>setShowEditTempoModal(false)}>
        <div onClick={e=>e.stopPropagation()}>
            <input type="text" value={tempos.up} onChange={e=>handleTempoChange(Number(e.target.value),'up')}/>
            <input type="text" value={tempos.uphold} onChange={e=>handleTempoChange(Number(e.target.value),'uphold')}/>
            <input type="text" value={tempos.down} onChange={e=>handleTempoChange(Number(e.target.value),'down')}/>
            <input type="text" value={tempos.downhold} onChange={e=>handleTempoChange(Number(e.target.value),'downhold')}/>
            <div>
                <button onClick={HandleAddOrUpdateTempo}>Zapisz</button>
                <button onClick={()=>setShowEditTempoModal(false)}>Anuluj</button>
            </div>
            {error && <div className='text-red-600'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}
