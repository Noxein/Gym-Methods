
export const LoadingTrainingPlanSkeleton = () => {
  return (
    <div className='mx-5 mb-20'>
      <div className='flex flex-col gap-2 mt-5'>
        <div className={`w-full gradient-background rounded-md py-3 px-2`} >
          <span className='invisible gradient-background'>o</span>
        </div>
        <div className={`rounded-md gradient-background px-2 py-3 `}>
        <span className='invisible gradient-background'>o</span>
        </div>
      </div>

      <div className='mt-10 flex-col flex'>
        <div className={`text-left px-2 pr-4 w-full gradient-background-green rounded-md py-3 flex justify-between text-opacity-0 mb-1`}>
          <span className='invisible gradient-background'>o</span>
        </div>

        <LoadingExerciseElement opacity={3}/>
        <LoadingExerciseElement opacity={2}/>
        <LoadingExerciseElement opacity={1}/>

        <div className={`my-2 py-4 px-2 rounded-md flex gradient-background` }>
          <span className='invisible'>o</span>
        </div>
      </div>

    </div>
  )
}

const LoadingExerciseElement = ({opacity}:{opacity:number}) => {
  return(
    <div className={` gradient-background my-1 py-4 px-2 rounded-md flex ${opacity===3?'bg-opacity-80':opacity===2?'bg-opacity-60':'bg-opacity-40'}` }>
      <span className='invisible'>o</span>
    </div>
  )
}