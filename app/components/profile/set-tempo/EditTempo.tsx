import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateTempo } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'

type EditTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditTempo = ({selectedExercise,setShowEditTempoModal}:EditTempoType) => {
    const[tempos,setTempos] = useState(selectedExercise.tempo)
    const[error,setError] = useState('')

    const theme = useContext(ThemeContext)
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
        <div onClick={e=>e.stopPropagation()} className={`flex flex-col gap-2 text-xl px-10 mb-20 py-5 bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.accent}] border-2 rounded-md max-w-xl`}>
            <div>Tempo - {selectedExercise.name}</div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4'>
                    <DivInputLabel handleChange={handleTempoChange} text='Tempo Góra' value={tempos.up} target='up'/>
                    <DivInputLabel handleChange={handleTempoChange} text='Wstrzymanie Góra' value={tempos.uphold} target='uphold'/>
                </div>
                <div className='flex gap-4'>
                    <DivInputLabel handleChange={handleTempoChange} text='Tempo Dół' value={tempos.down} target='down'/>
                    <DivInputLabel handleChange={handleTempoChange} text='Wstrzymanie Dół' value={tempos.downhold} target='downhold'/>
                </div>
            </div>
            
            <div className='flex gap-2'>
                <button onClick={HandleAddOrUpdateTempo} className='rounded-md flex-1 bg-green-500 mx-6 py-2'>Zapisz</button>
                <button onClick={()=>setShowEditTempoModal(false)} className='rounded-md flex-1 bg-red-500 mx-6'>Anuluj</button>
            </div>
            {error && <div className='text-red-600'>{error}</div>}
        </div>
    </BlurBackgroundModal>
  )
}

const DivInputLabel = ({handleChange,value,text,target}:{handleChange:(value:number,target:'up'|'uphold'|'down'|'downhold')=>void,value:number,text:string,target:'up'|'uphold'|'down'|'downhold'}) => {
    const theme = useContext(ThemeContext)

    return (
        <div className='flex-1'>
            <label htmlFor={text}>{text}</label>
            <input type="text" id={text} value={value} onChange={e=>handleChange(Number(e.target.value),target)} className={`w-full bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.accent}] border-2 rounded-md pl-2 py-1`}/>
        </div>
    )
}