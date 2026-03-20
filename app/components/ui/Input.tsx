import { cn } from "@/app/lib/cn"

interface Input extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelName:string,
    labelClass?: string,
}

export const Input = ({labelName,labelClass,...rest}:Input) => {
  return (
    <div className='relative w-full text-white'>
        <label htmlFor={labelName} className='absolute -top-1/4 text-base left-4 px-1'>
          <div className={cn('z-20 relative text-sm', labelClass)}>{labelName}</div>
          <div className='absolute h-1  w-[105%] bg-dark bottom-[6px] -left-1 text-base text-opacity-0 z-10'></div>
        </label>
        
        <input type="text" id={labelName} {...rest} className={cn('bg-dark border-2 border-borderInteractive rounded-lg pl-2 py-2 w-full outline-none', rest.className)}/>
    </div>
  )
}
