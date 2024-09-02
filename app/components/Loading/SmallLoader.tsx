import React from 'react'

export const SmallLoader = ({sClass}:{sClass?:string}) => {
  return (
    <div className='flex justify-center'>
        <span className={`loader1 ${sClass}`}>

        </span>
    </div>
  )
}
