import { TimerContext } from '@/app/context/TimerContext'
import React, { useContext, useEffect, useState } from 'react'

export const Timer = () => {

    const timeContext = useContext(TimerContext)
    const { currentSecond, setCurrentSecond } = timeContext!

  return (
    <div className='text-sm text-white mt-6 text-right font-mono'>
        {currentSecond / 60 >= 1 ? Math.floor(currentSecond / 60): '00'}:{currentSecond % 60 <=9?'0':null}{currentSecond % 60}    
    </div>
  )
}
