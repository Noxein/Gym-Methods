import { dayArrayInitializer } from "@/app/lib/utils";
import { isSameDay } from "date-fns";
import { useTranslations } from "next-intl";

function DaysWidget() {

    const days = dayArrayInitializer()
    const u = useTranslations("Utils")
        
    return (     <div className={`bg-marmur w-screen flex justify-evenly py-2 min-h-16`}>
            {days.map((day,i)=>(
                <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${isSameDay(day,new Date())?`bg-dark text-marmur`:null} rounded-full`} 
                >
    
                    <span className='text-xl font-bold'>{u("WeekFirstLetter",{WeekIndex: i})}</span>
                
                    {day.getDate()}
                </div>
            ))}
        </div> );
}

export default DaysWidget;