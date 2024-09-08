import React, { useContext, useRef } from 'react'
import { ActionTypes, ActionTypesEnum, DifficultyLevel, Series } from '../../types'
import { ThemeContext } from '@/app/context/ThemeContext'
import { Icon } from '../Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'

type DisplayCurrentSeriesTypes = {
    seriesname:string,
    currentSeries:Series[],
    dispachSeries:React.Dispatch<ActionTypes>,
    showTimeMesure:boolean
}
export const DisplayCurrentSeries = ({seriesname,currentSeries,dispachSeries,showTimeMesure}:DisplayCurrentSeriesTypes) => {
    const theme = useContext(ThemeContext)
    const deleteSet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        e.preventDefault()
        dispachSeries({type:"DELETESERIES",payload:index})
        localStorage.setItem(seriesname,JSON.stringify(currentSeries.filter((set,i)=>i!==index)))
    }
    const editInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,index:number,field:ActionTypesEnum) => {
        const arrayCopy = [...currentSeries]
        if(field === 'EDITSERIESKG'){
            if(e.target.value.length > 3) return
            dispachSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].weight = Number(e.target.value)
        }
        if(field === 'EDITSERIESREPEAT'){
            if(e.target.value.length > 3) return
            dispachSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].repeat = Number(e.target.value)
        }
        if(field === "EDITSERIESDIFFICULTY"){
            dispachSeries({type:field,index, payload:e.target.value as DifficultyLevel}); 
            arrayCopy[index].difficulty = e.target.value as DifficultyLevel
        }
        if(field === 'EDITSERIESTIME'){
            dispachSeries({type:field,index, payload:e.target.value});
            arrayCopy[index].time = e.target.value
        }
        localStorage.setItem(seriesname,JSON.stringify(arrayCopy))
    }
  return (
    <div className='flex flex-col gap-2 mt-2 text-white'>
        <div className={`justify-around grid ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'} mr-10 -mb-2 `}>
            <div className='font-light'>Ciężar</div>
            <div className='font-light'>Powtórzenia</div>
            <div className='font-light'>Ciężkość</div>
            {showTimeMesure && <div className='font-light'>Czas</div>}
        </div>
        {currentSeries.map((series,index)=>(
            <div className={`flex bg-${theme?.colorPallete.accent} rounded-md`} key={index}>
                <div className={`flex-1 bg-${theme?.colorPallete.primary} px-2 py-3 grid ml-[1px] my-[1px] rounded-md ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'}`}>
                    <div className='flex'>
                        <Input type="number" maxLength={3} max={3} value={series.weight} className={`w-full mr-1 bg-${theme?.colorPallete.primary}`} onChange={(e)=>{editInput(e,index,'EDITSERIESKG')}}/> 
                    </div>

                    <div className='flex'>
                        <Input type="text" value={series.repeat} className={`w-full mr-1 bg-${theme?.colorPallete.primary} min-w-10`} onChange={(e)=>{editInput(e,index,'EDITSERIESREPEAT')}}/>
                    </div>

                    <div>
                        <select name="" id="" value={series.difficulty} className={`bg-${theme?.colorPallete.primary} w-full border-b-2 border-black pb-1`} onChange={(e)=>{editInput(e,index,'EDITSERIESDIFFICULTY')}}>
                            <option value="easy">Łatwa</option>
                            <option value="medium">Średnia</option>
                            <option value="hard">Trudna</option>
                        </select>
                    </div>

                    {showTimeMesure && 
                    <div>
                        <Input type="text" value={series.time} className={`w-[calc(100%-10px)] mr-1 bg-${theme?.colorPallete.primary} ml-4`} onChange={(e)=>{editInput(e,index,'EDITSERIESTIME')}}/> 
                    </div>}
                </div>
                <div className='w-10 flex justify-center items-center'>
                    <button onClick={e=>deleteSet(e,index)}>
                        <Icon className='bg-opacity-0'>
                            <TrashIcon fill={'#0D1317'}/>
                        </Icon>
                    </button>
                </div>
                
            </div>
        ))}
    </div>
  )
}

const Input = ({...rest}:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    return(
        <input {...rest} ref={inputRef} onClick={()=>inputRef.current?.select()}/> 
    )
}