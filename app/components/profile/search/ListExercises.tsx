import { useState } from 'react'
import { Icon } from '../../Icon'
import { ExpandIcon } from '@/app/ui/icons/ExpandIcon'
import { SelectExercise } from './SelectExercise'
import { useTranslations } from 'next-intl'
import { nameTrimmer } from '@/app/lib/utils'

type ListExercisesTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
}
export const ListExercises = ({item,objectName,currentLevel=0,isLast=true}:ListExercisesTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `${currentLevel*3}`
    
    const t = useTranslations("Home/Profile/Search")
    const d = useTranslations("DefaultExercises")

    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={t("YourExercises")} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}
                />
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(
            <SelectExercise isFirst={index===0} mLeft={'6'} key={x.id} text={x.exercisename} translatedText={x.exercisename}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col font-semibold`}>
            <ExpandBtn text={d(objectName)} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>

        {showChildren && <div className='flex flex-col gap-2 font-normal'>
                {item.map((x,index)=>(       
                        <SelectExercise isFirst={index===0} mLeft='12' key={x} text={x} translatedText={d(nameTrimmer(x))}/>
                    ))}
            </div>}

        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName&&d(objectName)||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <ListExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length}/>
            ))}
            
            </div>)
    }
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean,
    mLeft: string,
    currentLevel: number,
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,mLeft,currentLevel,...rest}:ExpandBtn) => {

    if(isExpanded) return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} bg-dark text-marmur border-borderInteractive border-2 rounded-lg flex justify-between p-[2px] items-center `}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
    return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} text-marmur bg-dark border-borderInteractive border-2 rounded-lg flex justify-between p-[2px] items-center`}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon  expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
}