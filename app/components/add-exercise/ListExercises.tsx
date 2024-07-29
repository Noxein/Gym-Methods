'use client'
import Link from "next/link"
import { useState } from "react"

export const ListExercises = ({item,objectName,currentLevel=0}:{item:any, objectName?:string,currentLevel?:number}) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    console.log(currentLevel,showChildren)
    const mLeft = `pl-${currentLevel*4}`
    const bgColor = `bg-blue-${currentLevel+4}00`

    if(Array.isArray(item)){
        return (<div className='flex flex-col'>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft} ${bgColor} text-white flex justify-between pr-4 py-2`}/>

        {showChildren && <div className='flex flex-col gap-[2px]'>
                {item.map((x,index)=>(       
                    <>
                        <LinkToExercise text={x} mLeft={`pl-${(currentLevel+1)*4}`} bgColor={`bg-blue-${currentLevel+4+1}00`} key={x}/>
                    </>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        
        return (<div className='flex flex-col'>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft} ${bgColor} text-white flex justify-between pr-4 py-2`}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <ListExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1}/>
            ))}
            

            </div>)
    }
}

const LinkToExercise = ({text,mLeft,bgColor}:{text: string,mLeft:string,bgColor:string}) => {
    return(
        <Link href={`/home/add-exercise/${text.trim()}`} className={`text-left text-white ${mLeft} ${bgColor} py-1`}>
            {text}
        </Link>
)
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,...rest}:ExpandBtn) => {

    return (
        text && <button className='flex justify-between px-4' {...rest}>
            <span>{text}</span>

            <ExpandIcon expanded={isExpanded}/>

        </button>
    )
}

const ExpandIcon = ({expanded}:{expanded: boolean}) => {
    const fill = '#fff'
    return(
        expanded?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={20} height={20} fill={fill}>
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>:
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20} fill={fill}>
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>
    )
}