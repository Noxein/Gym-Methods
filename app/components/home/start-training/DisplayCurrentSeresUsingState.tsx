import { useRef } from 'react'
import { ActionTypesEnum, DifficultyLevelType, LocalStorageTraining, Side } from '@/app/types'
import { Icon } from '@/app/components/Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { localStorageSetter } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'

type DisplayCurrentSeresUsingStateTypes = {
    exercisename:string,
    trainingState: LocalStorageTraining,
    showTimeMesure:boolean,
    isTraining: boolean,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
}
export const DisplayCurrentSeresUsingState = ({exercisename,trainingState,showTimeMesure,isTraining,setLocalStorageTrainingData}:DisplayCurrentSeresUsingStateTypes) => {

    const deleteSet = (index:number) => {
        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.exercises[xCopy.currentExerciseIndex].sets = xCopy.exercises[xCopy.currentExerciseIndex].sets.filter((exercise,exerciseIndex)=>{ return index !== exerciseIndex})
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }
    
    const editInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,index:number,field:ActionTypesEnum) => {
        if(field === 'EDITSERIESKG'){
            if(e.target.value.length > 3) return
            setLocalStorageTrainingData(x=>{
                let xCopy = {...x}
                xCopy.exercises[xCopy.currentExerciseIndex].sets[index].weight = Number(e.target.value)
                localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
                return xCopy
            })
        }
        if(field === 'EDITSERIESREPEAT'){
            if(e.target.value.length > 3) return

            setLocalStorageTrainingData(x=>{
                let xCopy = {...x}
                xCopy.exercises[xCopy.currentExerciseIndex].sets[index].repeat = Number(e.target.value)
                localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
                return xCopy
            })
        }
        if(field === "EDITSERIESDIFFICULTY"){
            setLocalStorageTrainingData(x=>{
                let xCopy = {...x}
                xCopy.exercises[xCopy.currentExerciseIndex].sets[index].difficulty = e.target.value as DifficultyLevelType
                localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
                return xCopy
            })
        }
        if(field === 'EDITSERIESTIME'){
            setLocalStorageTrainingData(x=>{
                let xCopy = {...x}
                xCopy.exercises[xCopy.currentExerciseIndex].sets[index].time = e.target.value
                localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
                return xCopy
            })
        }
    }
    const handleChangeSide = (index:number,side:Side) => {
        let newSide:Side = side
        
        if(side === 'Both') newSide = 'Left'
        if(side === 'Left') newSide = 'Right'
        if(side === 'Right') newSide = 'Both'

        setLocalStorageTrainingData(x=>{
            let xCopy = {...x}
            xCopy.exercises[xCopy.currentExerciseIndex].sets[index].side = newSide
            localStorageSetter(xCopy.trainingNameInLocalStrage,xCopy)
            return xCopy
        })
    }

    const u = useTranslations("Utils")

  return (
    <div className='flex flex-col gap-2 mt-3 text-white mb-2'>

        {trainingState.exercises[trainingState.currentExerciseIndex].sets.map((series,index)=>(
            <div className={`flex bg-marmur rounded-md ${index===0?'mt-2':null}`} key={index}>
                <div className='text-dark text-xl flex items-center justify-center text-center px-1 cursor-pointer w-6' onClick={(e)=>handleChangeSide(index,series.side as Side)}>
                    {u(series.side)[0]}
                </div>
                <div className={`flex-1 bg-dark px-2 py-3 grid ml-[1px] my-[1px] rounded-md ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'}`}>
                    <div className='flex'>
                        <Input type="number" maxLength={3} max={3} value={series.weight} className={`w-full mr-1 bg-dark`} onChange={(e)=>{editInput(e,index,'EDITSERIESKG')}}/> 
                    </div>

                    <div className='flex'>
                        <Input type="text" value={series.repeat} className={`w-full mr-1 bg-dark min-w-10`} onChange={(e)=>{editInput(e,index,'EDITSERIESREPEAT')}}/>
                    </div>

                    <div>
                        <select name="" id="" value={series.difficulty} className={`bg-dark w-full border-b-2 border-black pb-1`} onChange={(e)=>{editInput(e,index,'EDITSERIESDIFFICULTY')}}>
                            <option value="easy">{u("Easy")}</option>
                            <option value="medium">{u("Medium")}</option>
                            <option value="hard">{u("Hard")}</option>
                        </select>
                    </div>

                    {showTimeMesure && 
                    <div>
                        <Input type="text" value={series.time} className={`w-[calc(100%-10px)] mr-1 bg-dark ml-4`} onChange={(e)=>{editInput(e,index,'EDITSERIESTIME')}}/> 
                    </div>}
                </div>
                <div className='w-10 flex justify-center items-center'>
                    <button onClick={()=>deleteSet(index)}>
                        <Icon className='bg-opacity-0'>
                            <TrashIcon fill={'#0D1317'}/>
                        </Icon>
                    </button>
                </div>
                
            </div>
        ))}
    </div>
  )
}

const Input = ({...rest}:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    return(
        <input {...rest} ref={inputRef} onClick={()=>inputRef.current?.select()}/> 
    )
}