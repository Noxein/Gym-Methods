export const TrainingListSkeleton = () => {
  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>
        <TrainingLink />
        <TrainingLink />
    </div>
  )
}


export const TrainingLink = () => {

  return (
    <div className={` py-[1px] pl-[1px] rounded-md flex gradient-background`}>
        <div className={`flex flex-col rounded-md flex-1 px-4 pb-5 pt-3 relative opacity-0 `}>
            <span>o</span>
            <span className='text-gray-400 text-sm relative'>
                <span className='absolute -top-2'>o</span>
            </span>
        </div>
    </div>
  )
}