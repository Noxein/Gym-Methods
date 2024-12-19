import { useState } from 'react'
import { AddExercise } from './SearchExercisesTraining'
import { ExpandIcon } from '@/app/ui/icons/ExpandIcon'
import { Icon } from '@/app/components/Icon'
import { useTranslations } from 'next-intl'

type ListExercisesTrainingTypes = {
    item:any,
    handleSelect: (name:string) => void,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
}
export const ListExercisesTraining = ({item,handleSelect,objectName,currentLevel=0,isLast=true}:ListExercisesTrainingTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`

    const t = useTranslations("Home/Profile/My-Training-Plans/[TrainingPlanName]")
    const d = useTranslations("DefaultExercises")

    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn 
                text={t("YourExercises")} 
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
                    key={x.id}
                    handleSelect={handleSelect}
                />
            ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (
            <div className={`flex flex-col ${mLeft} font-semibold`}>
                <ExpandBtn text={objectName ? d(objectName) : ''} isExpanded={showChildren} onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft}/>

                {showChildren && 
                <div className='flex flex-col gap-1 font-normal'>
                    {item.map((x,index)=>(       
                            <AddExercise 
                                id={x} 
                                isFirst={index===0} 
                                mLeft={`ml-10`} 
                                text={x} 
                                key={x}
                                handleSelect={handleSelect}
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
                    text={objectName ? d(objectName) : ''} 
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
                        handleSelect={handleSelect}
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

    return (
        text && 
        <button {...rest} className={`text-left ${mLeft} bg-borderInteractive text-marmur rounded-lg flex pl-[2px] py-[2px] items-center`}>
            <span className={`flex-1 rounded-lg bg-dark py-3 pl-4`}>{text}</span>            
        </button>
    )
}