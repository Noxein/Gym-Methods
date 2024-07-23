import React from 'react'
import { Series } from '../types'

export const DisplayCurrentSeries = ({currentSeries}:{currentSeries:Series[]}) => {
  return (
    <div>
        {currentSeries.map((series,index)=>(
            <div className='flex justify-between'>
                <div>{series.weight}</div> <span>-</span> <div>x{series.repeat}</div>
            </div>
        ))}
    </div>
  )
}
