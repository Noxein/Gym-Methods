export const LatestTrainingsSkeleton = () => {
  return (
    <div className='mx-5'>
      <h2 className='text-marmur text-2xl text-center mt-6'>Ostatnie treningi</h2>
      <div className='flex flex-wrap gap-4 mt-3'>
    
          <CompletedTraining />
          <CompletedTraining />

      </div>
    </div>
  )
}

const CompletedTraining = () => {

  return (
    <div className={`text-marmur border-black flex-1 py-2 px-2 rounded-lg min-h-36 min-w-80 gradient-background`}>
        <div className='flex justify-between text-opacity-0'>
            <span className='text-xl text-opacity-0 opacity-0'>02</span>
            <span className='text-gray-500 text-xs text-opacity-0'>03</span>
        </div>
        <div className='pt-2'>
            <div className={`border-t-[1px] border-b-[1px] text-gray-400 border-black flex justify-between mx-4 px-2 py-[2px] text-opacity-0`}>
                <span className="text-opacity-0">o</span>
                <span className="text-opacity-0">o</span>
            </div>
        </div>
    </div>
  )
}