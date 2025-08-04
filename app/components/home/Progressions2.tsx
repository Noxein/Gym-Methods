import React, { useState } from 'react'
import { Icon } from '../Icon'
import { SwapIcon } from '@/app/ui/icons/ExpandIcon'
import { ProgessionsDeclinesType } from '@/app/types';
import { format } from 'date-fns';

type Progressions2Types = {
    setSwtich: React.Dispatch<React.SetStateAction<boolean>>,
        bestExercise?: {
            exercise: ProgessionsDeclinesType[];
            score: number;
        },
        worstExercise?: {
            exercise: ProgessionsDeclinesType[];
            score: number;
        }
}
export const Progressions2 = ({setSwtich,bestExercise,worstExercise}:Progressions2Types) => {
    const[showIncrease,setShowIncrease] = useState(false)
    const[showDecrease,setShowDecrease] = useState(false)
    const[selectedExercise,setSelectedExercise] = useState<'best'|'worst'|'both'>('both')
  return (
    <div className='mx-5 mt-5 px-2'>
        <div className='flex justify-center' onClick={()=>setSwtich(x=>!x)}>
        <h2 className='text-white text-center mb-2 text-xl'>Progresje</h2>
        <Icon>
            <SwapIcon fill='#3C9F65'/>
        </Icon>
        </div>
        <div className='flex gap-2 text-white'>
            {worstExercise && worstExercise.exercise && worstExercise.exercise.length > 0 ? <div className={`${selectedExercise === 'both' ? 'w-1/2' : selectedExercise === 'worst'? 'w-3/4': 'w-1/4'} duration-200 p-2 rounded-lg bg-red text-center flex flex-col content-between justify-between gap-2`} onClick={()=>{setShowIncrease(false);setShowDecrease(true);setSelectedExercise('worst')}}>
                <div>{worstExercise?.exercise[0].exercisename}</div>

                {showDecrease && <div className='flex justify-between text-sm'>
                    <div className='flex-col gap-1 '>
                        <p>{format(worstExercise?.exercise[0].date!,'dd.MM.yyyy')}</p>
                        {worstExercise?.exercise[0].sets.map((set,index)=>(<div key={index} className=' text-neutral-300'>
                            {set.weight} KG/{set.repeat}
                        </div>))}
                    </div>

                    <div className='flex-col gap-1'>
                        <p>{format(worstExercise?.exercise[1].date!,'dd.MM.yyyy')}</p>
                        {worstExercise?.exercise[1].sets.map((set,index)=>(<p key={index} className='text-neutral-300 '>
                            {set.weight} KG/{set.repeat}
                        </p>))}
                    </div>
                </div>}

            </div> : <div className='rounded-lg bg-red text-center flex-1 justify-center items-center flex'>Za mało danych</div>}
            {bestExercise && bestExercise.exercise &&  bestExercise.exercise.length > 0 ? <div className={` ${selectedExercise === 'both' ? 'w-1/2' : selectedExercise === 'best'? 'w-3/4': 'w-1/4'} duration-200 p-2 rounded-lg bg-green text-center flex flex-col justify-between gap-2`} onClick={()=>{setShowDecrease(false);setShowIncrease(true);setSelectedExercise('best')}}>
                <p>{bestExercise?.exercise[0].exercisename}</p>

                {showIncrease && <div className='flex justify-between text-sm'>
                    <div className='flex-col'>
                        <p>{format(bestExercise?.exercise[0].date!,'dd,MM,yyyy')}</p>
                        {bestExercise?.exercise[0].sets.map((set,index)=>(<p key={index} className='text-neutral-200'>
                            {set.weight} KG/{set.repeat}
                        </p>))}
                    </div>

                    <div className='flex-col'>
                        <p>{format(bestExercise?.exercise[1].date!,'dd,MM,yyyy')}</p>
                        {bestExercise?.exercise[1].sets.map((set,index)=>(<p key={index} className='text-neutral-200'>
                            {set.weight} KG/{set.repeat}
                        </p>))}
                    </div>
                </div>}
            </div> : <div className='rounded-lg bg-green text-center flex-1 justify-center items-center flex'>Za mało danych</div>}
        </div>
    </div>
  )
}
