import React from 'react'

export default function page({params}:{params:{exercisename:string}}){
  return (
    <div className='mt-20'
    >{decodeURI(params.exercisename)}</div>
  )
}
