import React from 'react'

interface ErrorDiv {
    error: string
}
export const ErrorDiv = ({error}:ErrorDiv) => {
    if(!error) return
  return (
    <div className='text-red'>{error}</div>
  )
}
