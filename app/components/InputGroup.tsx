import React from 'react'

export const InputGroup = ({id,text,type='text'}:{id:string,text:string,type?:string}) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={id}>{text}</label>
        <input type={type} id={id} name={id}/>
    </div>
  )
}
