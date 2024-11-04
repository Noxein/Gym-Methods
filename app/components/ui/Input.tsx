interface Input extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelName:string,
}

export const Input = ({labelName,...rest}:Input) => {
  return (
    <div className='relative w-full text-white'>
        <label htmlFor={labelName} className='absolute -top-1/4 text-base left-4 px-1'>
          <div className='z-20 relative'>{labelName}</div>
          <div className='absolute h-1  w-[105%] bg-dark bottom-[10px] -left-1 text-base text-opacity-0 z-10'></div>
        </label>
        
        <input type="text" id={labelName} {...rest} className='bg-dark border-1 border-marmur rounded-lg pl-2 py-2 w-full outline-none'/>
    </div>
  )
}
