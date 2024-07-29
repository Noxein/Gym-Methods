'use client'
import { ExpandIcon } from "@/app/ui/icons/ExpandIcon"
import Link from "next/link"
import { useState } from "react"

export const ListExercises = ({item,objectName,currentLevel=0}:{item:any, objectName?:string,currentLevel?:number}) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    console.log(currentLevel,showChildren)
    const mLeft = `ml-${currentLevel*2}`
    const bgColor = `bg-gray-200 border-b-2 border-white`

    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${bgColor} ${mLeft} font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ml-2 flex justify-between pr-4 py-2 text-black`}/>

        {showChildren && <div className='flex flex-col gap-[2px] font-normal'>
                {item.map((x,index)=>(       
                        <LinkToExercise text={x} mLeft={`ml-${(currentLevel+1)*2}`} bgColor={`bg-blue-${currentLevel+4+1}00`} key={x} isLast={index+1===item.length}/>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        
        return (<div className={`flex flex-col ${bgColor} gap-1 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-black flex justify-between pr-4 py-2`}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <ListExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1}/>
            ))}
            

            </div>)
    }
}

const LinkToExercise = ({text,mLeft,bgColor,isLast}:{text: string,mLeft:string,bgColor:string,isLast:boolean}) => {
    return(
        <Link href={`/home/add-exercise/${text.trim()}`} className={`text-left ${mLeft} bg-gray-200 py-1 pl-2 text-black ${!isLast?'border-b-2 border-white':null}`}>
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
        text && <button {...rest}>
            <span>{text}</span>

            <ExpandIcon expanded={isExpanded}/>

        </button>
    )
}