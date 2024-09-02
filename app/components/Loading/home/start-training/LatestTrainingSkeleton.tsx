import React from 'react'

export const LatestTrainingSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 mx-5'>
        <LastTrainingItem />
        <LastTrainingItem />
    </div>
  )
}


export const LastTrainingItem = () => {
  return (
    <div className={`gradient-background py-[1px] px-[1px] rounded-md flex border-1`}>
        <div className={` flex rounded-md flex-1 px-4 pb-4 pt-2 justify-between items-center`}>
            <div className='flex flex-col relative opacity-0'>
                <span>o</span>
                <span className='text-gray-400 text-sm relative'>
                    <span className='absolute -top-2'>o</span>
                </span>
            </div>
        </div>

    </div>
  )
}