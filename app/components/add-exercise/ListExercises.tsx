'use client'
import { ThemeContext } from "@/app/context/ThemeContext"
import { ExpandIcon } from "@/app/ui/icons/ExpandIcon"
import { useContext, useState } from "react"
import { LinkToExercise } from "./LinkToExercise"
import { Icon } from "../Icon"

type ListExercisesTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
}
export const ListExercises = ({item,objectName,currentLevel=0,isLast=true}:ListExercisesTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `${currentLevel*3}`

    const theme = useContext(ThemeContext)
    
    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`relative flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={'Twoje ćwiczenia'} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}
                />
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(
            <LinkToExercise isFirst={index===0} mLeft={'6'} key={x.id} text={x.exercisename}/>
        ))}
            <div className={`h-[calc(100%-20px)] absolute bg-marmur w-1 -z-[1] left-2`}></div>
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`relative flex flex-col font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>

        {showChildren && <div className='flex flex-col gap-2 font-normal'>
                {item.map((x,index)=>(       
                        <LinkToExercise isFirst={index===0} mLeft='12' key={x} text={x}/>
                    ))}
            </div>}

            <div className={`${currentLevel===0?'':'h-[calc(100%-20px)] absolute bg-marmur w-1 -z-[1] left-8'}`}></div>
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`relative flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <ListExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length}/>
            ))}
            
            {currentLevel<1?null:
            <>
                <div className={`h-[calc(100%-20px)] absolute bg-marmur w-1 -z-[1] left-2 '} `}></div>
            </>}
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
    const theme = useContext(ThemeContext)

    if(isExpanded) return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={theme?.colorPallete.accent}/>
            </Icon>
            {currentLevel<=1? null:
            <>
                <div className={`absolute h-1 w-4 bg-marmur -left-4 z-10`}></div>
            </>}
        </button>
    )
    return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} text-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} border-${theme?.colorPallete.primary} border-[1px] rounded-lg flex justify-between p-[1px] items-center`}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon  expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>

            {currentLevel<=1? null:
            <>
            <div className={`absolute h-1 w-4 bg-marmur -left-4 z-10`}></div>
            </>}
        </button>
    )
}