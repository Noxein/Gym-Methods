import { ThemeContext } from '@/app/context/ThemeContext'
import React, { useContext, useState } from 'react'
import { AddExercise } from './AddSingleExercise'
import { TrainingExerciseType } from '@/app/types'
import { ExpandIcon } from '@/app/ui/icons/ExpandIcon'
import { Icon } from '@/app/components/Icon'

type ListExercisesTrainingTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    setPlanExercises: React.Dispatch<React.SetStateAction<TrainingExerciseType[]>>,
    isTrainingInProgressPage?: boolean,
    setCurrentExercise?: React.Dispatch<React.SetStateAction<TrainingExerciseType>>,
    setTotalNumberOfTrainigs?: React.Dispatch<React.SetStateAction<number>>,
    setShowExerciseList?: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAddExercise?: React.Dispatch<React.SetStateAction<boolean>>,
}
export const ListExercisesTraining = ({item,objectName,currentLevel=0,isLast=true,setPlanExercises,isTrainingInProgressPage=false,setCurrentExercise,setTotalNumberOfTrainigs,setShowExerciseList,setShowAddExercise}:ListExercisesTrainingTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`

    const theme = useContext(ThemeContext)
    
    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn 
                text={'Twoje ćwiczenia'} 
                isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                mLeft={mLeft}
            />

            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(
                <AddExercise 
                    id={x.id} 
                    isFirst={index===0} 
                    mLeft={`ml-10`} 
                    text={x.exercisename} 
                    setPlanExercises={setPlanExercises} 
                    key={x.id}
                    isTrainingInProgressPage={isTrainingInProgressPage}
                    setCurrentExercise={setCurrentExercise}
                    setTotalNumberOfTrainigs={setTotalNumberOfTrainigs}
                    setShowExerciseList={setShowExerciseList}
                    setShowAddExercise={setShowAddExercise}
                />
            ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (
            <div className={`flex flex-col ${mLeft} font-semibold`}>
                <ExpandBtn text={objectName} isExpanded={showChildren} onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft}/>

                {showChildren && 
                <div className='flex flex-col gap-1 font-normal'>
                    {item.map((x,index)=>(       
                            <AddExercise 
                                id={x} 
                                isFirst={index===0} 
                                mLeft={`ml-10`} 
                                text={x} 
                                setPlanExercises={setPlanExercises} 
                                key={x}
                                isTrainingInProgressPage={isTrainingInProgressPage}
                                setCurrentExercise={setCurrentExercise}
                                setTotalNumberOfTrainigs={setTotalNumberOfTrainigs}
                                setShowExerciseList={setShowExerciseList}
                                setShowAddExercise={setShowAddExercise}
                            />
                    ))}
                </div>}
            </div>
        )
       
    }

    if(typeof item === 'object'){
        return (
            <div className={`flex flex-col gap-2 font-bold ${currentLevel===0?'mx-5':null}`}>

                <ExpandBtn 
                    text={objectName||''} 
                    isExpanded={showChildren} 
                    onClick={()=>setShowChildren(!showChildren)} 
                    mLeft={mLeft}
                />


                {showChildren && Object.keys(item).map((key,index)=>(
                    <ListExercisesTraining 
                        item={item[key]} 
                        objectName={Object.keys(item)[index]} 
                        key={key} 
                        currentLevel={currentLevel+1} 
                        isLast={index+1===Object.keys(item).length} 
                        setPlanExercises={setPlanExercises}
                        isTrainingInProgressPage={isTrainingInProgressPage}
                        setCurrentExercise={setCurrentExercise}
                        setTotalNumberOfTrainigs={setTotalNumberOfTrainigs}
                        setShowExerciseList={setShowExerciseList}
                        setShowAddExercise={setShowAddExercise}
                    />
                ))}
        
            </div>)
    }
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean,
    mLeft: string,
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,mLeft,...rest}:ExpandBtn) => {
    const theme = useContext(ThemeContext)

    return (
        text && 
        <button {...rest} className={`text-left ${mLeft} bg-${theme?.colorPallete.accent}  text-${theme?.colorPallete.accent} rounded-lg flex pl-[1px] py-[1px] items-center`}>
            <span className={`flex-1 rounded-lg bg-${theme?.colorPallete.primary} py-3 pl-4`}>{text}</span>

            <Icon className='p-0 -ml-1'>
                <ExpandIcon expanded={isExpanded} fill={theme?.colorPallete.accent}/>
            </Icon>
            
        </button>
    )
}