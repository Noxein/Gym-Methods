import React from 'react'
import { ActionTypes, ActionTypesEnum, DifficultyLevel, Series } from '../types'

export const DisplayCurrentSeries = ({seriesname,currentSeries,dispachSeries}:{seriesname:string,currentSeries:Series[],dispachSeries:React.Dispatch<ActionTypes>}) => {
    const deleteSet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        e.preventDefault()
        dispachSeries({type:"DELETESERIES",payload:index})
        localStorage.setItem(seriesname,JSON.stringify(currentSeries.filter((set,i)=>i!==index)))
    }
    const editInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,index:number,field:ActionTypesEnum) => {
        const arrayCopy = [...currentSeries]
        if(field === 'EDITSERIESKG'){
            dispachSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].weight = Number(e.target.value)
        }
        if(field === 'EDITSERIESREPEAT'){
            dispachSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].repeat = Number(e.target.value)
        }
        if(field === "EDITSERIESDIFFICULTY"){
            dispachSeries({type:field,index, payload:e.target.value as DifficultyLevel}); 
            arrayCopy[index].difficulty = e.target.value as DifficultyLevel
        }
        localStorage.setItem(seriesname,JSON.stringify(arrayCopy))
    }
  return (
    <div className='flex flex-col gap-2 mt-2 mb-44'>
        {currentSeries.map((series,index)=>(
            <div className='flex gap-2' key={index}>
                <div className='flex-1 bg-slate-500 px-6 py-2 rounded-md flex-col'>
                    <div>
                        <select name="" id="" value={series.difficulty} className='bg-slate-500 w-full' onChange={(e)=>{editInput(e,index,'EDITSERIESDIFFICULTY')}}>
                            <option value="easy">Łatwa</option>
                            <option value="medium">Średnia</option>
                            <option value="hard">Trudna</option>
                        </select>
                    </div>
                    <div className='flex justify-between px-1'>
                        <div className='flex'>
                            <input type="number" value={series.weight} className='w-10 bg-slate-500' onChange={(e)=>{editInput(e,index,'EDITSERIESKG')}}/> 
                            <span>kg</span>
                        </div>
                       
                        
                        <div className='flex'>
                            <span className='pr-1'>x</span>
                            <input type="text" value={series.repeat} className='w-10 bg-slate-500 text-right' onChange={(e)=>{editInput(e,index,'EDITSERIESREPEAT')}}/>
                        </div>
                    </div>
                </div>
                <button onClick={e=>deleteSet(e,index)} className='bg-red-200 px-2 rounded-md'>usun</button>
            </div>
        ))}
    </div>
  )
}
