import { useRef } from 'react'
import { ActionTypes, ActionTypesEnum, DifficultyLevelType, Series, Side } from '../../types'
import { Icon } from '../Icon'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'

type DisplayCurrentSeriesTypes = {
    exercisename:string,
    currentSeries:Series[],
    dispatchSeries:React.Dispatch<ActionTypes>,
    showTimeMesure:boolean,
    isTraining: boolean,
}
export const DisplayCurrentSeries = ({exercisename,currentSeries,dispatchSeries,showTimeMesure,isTraining}:DisplayCurrentSeriesTypes) => {
    const deleteSet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,index:number) => {
        e.preventDefault()
        dispatchSeries({type:"DELETESERIES",payload:index})
        localStorage.setItem(exercisename,JSON.stringify(currentSeries.filter((set,i)=>i!==index)))
    }
    const editInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,index:number,field:ActionTypesEnum) => {
        const arrayCopy = [...currentSeries]
        if(field === 'EDITSERIESKG'){
            if(e.target.value.length > 3) return
            dispatchSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].weight = Number(e.target.value)
        }
        if(field === 'EDITSERIESREPEAT'){
            if(e.target.value.length > 3) return
            dispatchSeries({type:field,index, payload:Number(e.target.value)});
            arrayCopy[index].repeat = Number(e.target.value)
        }
        if(field === "EDITSERIESDIFFICULTY"){
            dispatchSeries({type:field,index, payload:e.target.value as DifficultyLevelType}); 
            arrayCopy[index].difficulty = e.target.value as DifficultyLevelType
        }
        if(field === 'EDITSERIESTIME'){
            dispatchSeries({type:field,index, payload:e.target.value});
            arrayCopy[index].time = e.target.value
        }
        localStorage.setItem(exercisename,JSON.stringify(arrayCopy))
    }
    const handleChangeSide = (index:number,side:Side) => {
        const arrayCopy = [...currentSeries]
        let newSide:Side = side
        
        if(side === 'Both') newSide = 'Left'
        if(side === 'Left') newSide = 'Right'
        if(side === 'Right') newSide = 'Both'

        arrayCopy[index].side = newSide
        dispatchSeries({type:'EDITSERIESSIDE',index,payload:newSide})
        localStorage.setItem(exercisename,JSON.stringify(arrayCopy))
    }
    const u = useTranslations("Utils")
  return (
    <div className='flex flex-col gap-2 mt-3 text-white mb-2'>

        {currentSeries && currentSeries.map((series,index)=>(
            <div className={`flex bg-marmur rounded-md ${index===0?'mt-2':null}`} key={index}>
                <div className='text-dark text-xl flex items-center justify-center text-center px-1 cursor-pointer w-6' onClick={(e)=>handleChangeSide(index,series.side as Side)}>
                    {series.side === 'Left'? 'L' : series.side === 'Right'? 'P' : 'O'}
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
                    <button onClick={e=>deleteSet(e,index)}>
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