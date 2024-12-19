import React from 'react'

type MinMaxChartTypes = {
    min: number,
    max: number,
}

export const MinMaxChart = ({min,max}:MinMaxChartTypes) => {
  return (
    <div className='flex flex-col justify-between h-full text-sm w-8 text-gray-400 pr-[2px]'>
        <div className='text-right'>{max}</div>
        <div className='text-right'>{Math.round(max/2)}</div>
        <div className='text-right'>{min}</div>
    </div>
  )
}
