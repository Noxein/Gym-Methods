import React from 'react'
import { Series } from '../types'

export const DisplayCurrentSeries = ({seriesname,currentSeries,setSeries}:{seriesname:string,currentSeries:Series[],setSeries:React.Dispatch<React.SetStateAction<Series[]>>}) => {
    const deleteSet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        e.preventDefault()
        setSeries(sets=>sets.filter((set,i)=>i!==index))
        localStorage.setItem(seriesname,JSON.stringify(currentSeries.filter((set,i)=>i!==index)))
    }
  return (
    <div className='flex flex-col gap-2 mt-2 mb-44'>
        {currentSeries.map((series,index)=>(
            <div className='flex gap-2' key={series.weight + series.repeat + index}>
                <div className='grid grid-cols-[80px_auto] flex-1 bg-slate-500 px-6 py-2 rounded-md '>
                    <div>{series.weight}</div> 
                    <div className='ml-auto'>x{series.repeat}</div>
                </div>
                <button onClick={e=>deleteSet(e,index)} className='bg-red-200 px-2 rounded-md'>usun</button>
            </div>
        ))}
    </div>
  )
}
