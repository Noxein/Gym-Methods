import { cn } from "@/app/lib/cn"
import { useTranslations } from "next-intl"

interface Input extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    labelName:string,
    valuesToLoop: string[],
    labelClass?: string
}

export const Select = ({labelName,valuesToLoop,labelClass,...rest}:Input) => {
  const SL = useTranslations("SelectLoop")
  
  return (
    <div className='relative w-full text-white'>
        <label htmlFor={labelName} className='absolute -top-1/4 text-base left-4 px-1 z-20'>
          <div className={cn('z-20 relative text-sm', labelClass)}>{labelName}</div>
          <div className='absolute h-2 w-[105%] bg-dark bottom-[7px] -left-1 text-base text-opacity-0 z-10'></div>
        </label>
        
        <select id={labelName} {...rest} value={rest.value} className={cn(`bg-dark border-2 border-borderInteractive rounded-lg pl-2 py-2 w-full outline-none z-0 relative`, rest.className )}>
            {valuesToLoop.map(data=>(
                <option value={data} key={data}>{SL(data)}</option>
            ))}
        </select>
    </div>
  )
}
