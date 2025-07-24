import { TimerContext } from '@/app/context/TimerContext'
import React, { useContext, useEffect, useState } from 'react'

export const Timer = () => {

    const timeContext = useContext(TimerContext)
    const { timePassed, setTimePassed } = timeContext!

  return (
    <div className='text-sm text-white mt-6 text-right font-mono'>
        {timePassed / 60 >= 1 ? Math.floor(timePassed / 60): '00'}:{timePassed % 60 <=9?'0':null}{timePassed % 60}    
    </div>
  )
}
