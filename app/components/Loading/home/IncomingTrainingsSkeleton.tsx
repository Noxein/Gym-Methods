export const IncomingTrainingsSkeleton = () => {
  return (
    <div className='flex flex-col px-5 gap-4 mt-8'>
      <h2 className='text-center text-2xl text-marmur'>Najbliższe treningi</h2>
      <Training />
      <Training />
      <div className={`flex justify-between px-5 bg-green text-white py-2 rounded-lg items-center min-h-[49px] text-opacity-0 gradient-background`} >
            o
      </div>
    </div>
  )
}

export const Training = () => {

    return (
      <div  className={`flex justify-between items-center pt-3 border-[1px] rounded-lg py-2 px-4 min-h-[55px] gradient-background`}>
        <div className="flex flex-col leading-3 text-opacity-0">
            <span className='text-opacity-0 invisible'>o</span>
            <span className="text-gray-400 text-sm text-opacity-0 invisible">o</span>
        </div>
        
      </div>
    )
  }