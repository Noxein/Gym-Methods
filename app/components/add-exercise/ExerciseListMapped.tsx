'use client'
import React, { useEffect, useState } from 'react'
import { exerciseList } from '@/app/lib/exercise-list'
import Link from 'next/link'

export const ExerciseListMapped = () => {
  return (
    <div className='flex flex-col'>
        <ListExercises item={exerciseList} currentLevel={0}/>
    </div>
  )
}

const ListExercises = ({item,objectName,currentLevel=0}:{item:any, objectName?:string,currentLevel:number}) => {
    const[showChildren,setShowChildren] = useState(false)
    useEffect(()=>{
        if(!objectName) setShowChildren(true)
    },[])

    let mLeft 
    if(currentLevel==0) mLeft = 'pl-0'
    if(currentLevel==1) mLeft = 'pl-4'
    if(currentLevel==2) mLeft = 'pl-8'
    if(currentLevel==3) mLeft = 'pl-12'

    if(typeof item === 'object'){
        return (<>
        <button onClick={()=>setShowChildren(!showChildren)} className={`text-left ${mLeft}`}>
            {objectName}
        </button>

            {Object.keys(item).map((key,index)=>(
                showChildren && <ListExercises item={item[key]} objectName={Object.keys(item)[index]}  currentLevel={currentLevel+1}/>
            ))}

            </>)
    }
    if(Array.isArray(item)){
        return (<>
        <button onClick={()=>setShowChildren(!showChildren)} className={`${mLeft}`}>
            {objectName}
        </button>
            {item.map(x=>(
                <div>
                    {objectName}
                     <ListExercises item={x} currentLevel={currentLevel+1}/>
                </div>
                ))}
            </>)
       
    }
    if(typeof item === 'string'){
        return <LinkToExercise text={item} mLeft={mLeft!}/>
    }
    return null
}

const LinkToExercise = ({text,mLeft}:{text: string,mLeft:string}) => {
    return(
        <Link href={`/home/add-exercise/${text.trim()}`} className={`text-left ${mLeft}`}>
            {text}
        </Link>
)
}