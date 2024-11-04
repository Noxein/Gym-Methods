type DisplayTrainingSkeletonTypes = {
    isTraining: boolean
}
export const DisplayTrainingSkeleton = ({isTraining}:DisplayTrainingSkeletonTypes) => {
  return (
    <div className='px-4 pt-4'>
        <div className='flex justify-center w-full'>
            <span className={` text-xl text-center font-medium loader1 min-h-[28px] w-full`}></span>
        </div>
       
        <div className={`flex flex-col sticky top-0 pt-2 mt-2`}>
            <div className='flex flex-col gap-6'>
               <WeightAndRepeatInputs />
               <DifficultyLevel />
            </div>
            
            <div  className={`mt-6 text-xl bg-green text-white rounded-md py-4 flex items-center justify-between px-5 opacity-0`}>
                o
            </div>
        </div>

        <DisplayCurrentSeries />

        {!isTraining && <div  className={`bottom-0 left-0 fixed mb-20 py-6 w-full text-xl gradient-background text-white border-2 rounded-md`}>Zakończ ćwiczenie</div>}
    </div>
  )
}

const WeightAndRepeatInputs = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col flex-1 relative'>
                <Input/>
            </div>

            <div className='flex flex-col flex-1 relative'>
                <Input/>
            </div>
        </div>
    )
}

const Input = () => {
    return(
        <div  className={`w-full gradient-background border-white  border-[1px] min-h-10 text-lg rounded-lg pl-4`}> </div>
    )
}

const DisplayCurrentSeries = () => {
    return (
        <div className='flex flex-col gap-2 mt-2 text-white'>
        <div className={`justify-around grid mr-10 -mb-2 `}>

        </div>
            <div className='mt-5 flex flex-col gap-2'>
                <SingleSeries />
                <SingleSeries />
                <SingleSeries />
            </div>
    </div>
    )
}

const SingleSeries = () => {
    return (
        <div className={`flex gradient-background rounded-md`} >
        <div className={`flex-1 px-2 py-3 grid ml-[1px] my-[1px] rounded-md opacity-0`}>
        o
        </div>
        
    </div>
    )
}

const DifficultyLevel = () => {

    return(<div className='flex gap-2 gradient-background'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <div  className={`border-white border-[1px] rounded-md h-10`}>
            </div>
        </div>
        </div>)
}