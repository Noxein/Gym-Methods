import { useContext, useRef } from 'react'
import { ActionTypesEnum, DifficultyLevelType, LocalStorageTraining, Side } from '@/app/types'
import { Icon } from '@/app/components/Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { localStorageSetter } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'
import { ModalContexts } from './ModalContexts'

type DisplayCurrentSeresUsingStateTypes = {
    trainingState: LocalStorageTraining,
    showTimeMesure:boolean,
    localStorageTrainingData: LocalStorageTraining,
    setLocalStorageTrainingData: React.Dispatch<React.SetStateAction<LocalStorageTraining>>,
    setProgressedIndexes: (index:number) => void
}
export const DisplayCurrentSeresUsingState = ({trainingState,showTimeMesure,localStorageTrainingData,setLocalStorageTrainingData,setProgressedIndexes}:DisplayCurrentSeresUsingStateTypes) => {
    const modalsContext = useContext(ModalContexts)

    const progressedIndexes = modalsContext?.seriesIndexesThatMetGoal
    console.log(progressedIndexes)
    const deleteSet = (index:number) => {
        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets = localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets.filter((exercise,exerciseIndex)=>{ return index !== exerciseIndex})
        localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
        setProgressedIndexes(localStorageTrainingDataCopy.currentExerciseIndex)
    }
    
    const editInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,index:number,field:ActionTypesEnum) => {
        let localStorageTrainingDataCopy = {...localStorageTrainingData}

        if(field === 'EDITSERIESKG'){
            if(e.target.value.length > 3) return

            localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets[index].weight = Number(e.target.value)

            setLocalStorageTrainingData(localStorageTrainingDataCopy)
        }
        if(field === 'EDITSERIESREPEAT'){
            if(e.target.value.length > 3) return

            localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets[index].repeat = Number(e.target.value)

            setLocalStorageTrainingData(localStorageTrainingDataCopy)
        }
        if(field === "EDITSERIESDIFFICULTY"){
            localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets[index].difficulty = e.target.value as DifficultyLevelType

            setLocalStorageTrainingData(localStorageTrainingDataCopy)
        }
        if(field === 'EDITSERIESTIME'){
            localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets[index].time = Number(e.target.value)

            setLocalStorageTrainingData(localStorageTrainingDataCopy)
        }
        localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)
    }
    const handleChangeSide = (index:number,side:Side) => {
        let localStorageTrainingDataCopy = {...localStorageTrainingData}
        let newSide:Side = side
        
        if(side === 'Both') newSide = 'Left'
        if(side === 'Left') newSide = 'Right'
        if(side === 'Right') newSide = 'Both'

        localStorageTrainingDataCopy.exercises[localStorageTrainingDataCopy.currentExerciseIndex].sets[index].side = newSide
        localStorageSetter(localStorageTrainingDataCopy.trainingNameInLocalStrage,localStorageTrainingDataCopy)

        setLocalStorageTrainingData(localStorageTrainingDataCopy)
    }

    const u = useTranslations("Utils")

  return (
    <div className='flex flex-col gap-2 mt-3 text-white mb-2'>

        {trainingState.exercises[trainingState.currentExerciseIndex].sets.map((series,index)=>(
            <div className={`flex py-[2px] rounded-md ${index===0?'mt-2':null} ${progressedIndexes?.includes(index)?'bg-green':'bg-steel'}`} key={index}>
                <div className='text-white text-xl flex items-center justify-center text-center px-1 cursor-pointer w-6' onClick={(e)=>handleChangeSide(index,series.side as Side)}>
                    {u(series.side)[0]}
                </div>
                <div className={`flex-1 bg-dark px-2 py-2 grid ml-[1px] rounded-md ${showTimeMesure?'grid-cols-[repeat(4,1fr)]':'grid-cols-[repeat(3,1fr)]'}`}>
                    <div className='flex'>
                        <Input type="number" maxLength={3} max={3} value={series.weight} className={`w-full mr-1 bg-dark`} onChange={(e)=>{editInput(e,index,'EDITSERIESKG')}}/> 
                    </div>

                    <div className='flex'>
                        <Input type="number" value={series.repeat} className={`w-full mr-1 bg-dark min-w-10`} onChange={(e)=>{editInput(e,index,'EDITSERIESREPEAT')}}/>
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
                        <Input type="number" value={series.time} className={`w-[calc(100%-10px)] mr-1 bg-dark ml-4`} onChange={(e)=>{editInput(e,index,'EDITSERIESTIME')}}/> 
                    </div>}
                </div>
                <div className='w-10 flex justify-center items-center'>
                    <button onClick={()=>deleteSet(index)}>
                        <Icon className='bg-opacity-0'>
                            <TrashIcon fill={'#fff'}/>
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