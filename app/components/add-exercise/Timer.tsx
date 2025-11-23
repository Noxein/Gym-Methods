import { TimerContext } from '@/app/context/TimerContext'
import { cn } from '@/app/lib/cn'
import React, { useContext, useEffect, useState } from 'react'

type TimerTypes = {

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const Timer = ({className,...rest}:TimerTypes) => {

    const timeContext = useContext(TimerContext)
    const { timePassed, setTimePassed } = timeContext!

    console.log(timePassed)
  return (
    <div className={cn(`text-sm text-white mt-6 text-right font-mono`,className)} {...rest}>
        {timePassed / 60 >= 1 ? Math.floor(timePassed / 60): '0'}:{timePassed % 60 <=9?'0':null}{timePassed % 60}    
    </div>
  )
}
