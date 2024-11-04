import { dayArrayInitializer, WeekDayArrayPL } from '@/app/lib/utils'
import { isSameDay } from 'date-fns'

export const HomeWidgetSeleton = () => {
    const days = dayArrayInitializer()
  return (
    <div className='flex flex-col'>
        <div className={`bg-marmur w-screen flex justify-evenly py-2 min-h-16 gradient-background-light`}>
            {days.map((day,i)=>(
                <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${isSameDay(day,new Date())?`bg-dark text-marmur`:null} rounded-full`}>
                    <span className='text-xl font-bold'>{WeekDayArrayPL[i].slice(0,1)}</span>
                    {day.getDate()}
                </div>
            ))}
        </div>
        <div className='text-opacity-0'>
            <div className='text-marmur py-1 px-5 text-sm min-h-6'>
                
            </div>
            <div className='bg-marmur flex gap-4 px-5 py-2 text-sm gradient-background-light'>
                <div className='flex-1'>
                    <p className='min-h-5'></p>
                    <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark relative gradient-background'>
    
                    </div>
                    <p className='mt-2 min-h-10'>
                       
                    </p>
                </div>
    
                <div className='flex-1'>
                    <p className='min-h-5'></p>
                    <div className='bg-[#8A8A8A] rounded-lg h-7 me-shadow border-1 border-dark gradient-background'>
    
                    </div>
                    <p className='mt-2 min-h-10'>
                        
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
