import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useState } from 'react'
import { AddExercise } from './AddSingleExercise'
import { TrainingExerciseType } from '@/app/types'
import { ExpandIcon } from '@/app/ui/icons/ExpandIcon'

type ListExercisesTrainingTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
}
export const ListExercisesTraining = ({item,objectName,currentLevel=0,isLast=true,setPlanExercises}:ListExercisesTrainingTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`

    const theme = useContext(ThemeContext)
    
    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={'Twoje ćwiczenia'} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] bg-[${theme?.colorPallete.primary}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(
            <AddExercise id={x.id} isFirst={index===0} mLeft={`ml-10`} text={x.exercisename} setPlanExercises={setPlanExercises}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] bg-[${theme?.colorPallete.primary}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>

        {showChildren && <div className='flex flex-col gap-1 font-normal'>
                {item.map((x,index)=>(       
                        <AddExercise id={x} isFirst={index===0} mLeft={`ml-10`} text={x} setPlanExercises={setPlanExercises}/>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col gap-2 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft} bg-[${theme?.colorPallete.primary}]  text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <ListExercisesTraining item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} setPlanExercises={setPlanExercises}/>
            ))}
            

            </div>)
    }
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,...rest}:ExpandBtn) => {
    const theme = useContext(ThemeContext)

    return (
        text && <button {...rest} >
            <span>{text}</span>

            <ExpandIcon expanded={isExpanded} themeColor={theme?.colorPallete.accent}/>

        </button>
    )
}