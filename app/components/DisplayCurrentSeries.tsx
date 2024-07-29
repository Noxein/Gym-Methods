import React from 'react'
import { Series } from '../types'

export const DisplayCurrentSeries = ({currentSeries,setSeries}:{currentSeries:Series[],setSeries:React.Dispatch<React.SetStateAction<Series[]>>}) => {
    const deleteSet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        e.preventDefault()
        setSeries(sets=>sets.filter((set,i)=>i!==index))
        localStorage.setItem('series',JSON.stringify(currentSeries.filter((set,i)=>i!==index)))
    }
  return (
    <div>
        {currentSeries.map((series,index)=>(
            <div className='flex justify-between' key={series.weight + series.repeat + index}>
                <div>{series.weight}</div> <span>-</span> <div>x{series.repeat} <button onClick={e=>deleteSet(e,index)}>usun</button></div>
            </div>
        ))}
    </div>
  )
}
