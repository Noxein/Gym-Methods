import React, { useContext, useState } from 'react'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import { SelectedExerciseWithTempo } from '@/app/types'
import { AddOrUpdateTempo } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type EditTempoType = {
    selectedExercise: SelectedExerciseWithTempo,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const EditTempo = ({selectedExercise,setShowEditTempoModal}:EditTempoType) => {
    const[tempos,setTempos] = useState(selectedExercise.tempo)
    const[error,setError] = useState('')
    const[isLoading,setIsLoading] = useState(false)

    const theme = useContext(ThemeContext)
    const handleTempoChange = (value:number,target:'up'|'uphold'|'down'|'downhold') => {
        let tempoCopy = {...tempos}
        tempoCopy[target] = value
        setTempos(tempoCopy)
    }
    const HandleAddOrUpdateTempo = async () => {
        setIsLoading(true)
        const isError = await AddOrUpdateTempo(selectedExercise.id,tempos)
        if(isError && isError.error){
            setIsLoading(true)
            return setError(isError.error)
        } 
        setShowEditTempoModal(false)
        setIsLoading(false)
    }
    const HandleCloseModal = () => {
        if(isLoading) return
        HideShowHTMLScrollbar('show')
        setShowEditTempoModal(false)
    }
  return (
    <BlurBackgroundModal onClick={HandleCloseModal}>
        <div onClick={e=>e.stopPropagation()} className={`flex flex-col gap-2 text-xl px-10 mx-5 mb-20 py-5 bg-${theme?.colorPallete.primary} text-white border-${theme?.colorPallete.accent} border-[1px] rounded-md max-w-xl`}>
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
            
            {isLoading?
            <div className='flex justify-center'>
                <span className='loader1'></span>
            </div>:
            <div className='flex gap-4 mt-5 flex-col'>
                <button onClick={HandleAddOrUpdateTempo} className='rounded-md flex-1 bg-green py-2'>Zapisz</button>
                <button onClick={HandleCloseModal} className='rounded-md flex-1 bg-red py-2'>Anuluj</button>
            </div>}
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
            <input type="text" id={text} value={value} onChange={e=>handleChange(Number(e.target.value),target)} className={`w-full bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.accent} border-[1px] rounded-md pl-2 py-1`}/>
        </div>
    )
}