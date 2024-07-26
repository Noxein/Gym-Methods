'use client'
import React, { useState } from 'react'
import { exerciseList } from '@/app/lib/exercise-list'
import Link from 'next/link'

export const ExerciseListMapped = () => {
  return (
    <div className='flex flex-col'>
        <ListExercises item={exerciseList} />
    </div>
  )
}

const ListExercises = ({item,objectName}:{item:any, objectName?:string}) => {
    const[showChildren,setShowChildren] = useState(false)

    if(typeof item === 'object'){
        return (<>
        {objectName}
            {Object.keys(item).map((key,index)=>(
                <ListExercises item={item[key]} objectName={Object.keys(item)[index]}/>
            ))}
            </>)
    }
    if(Array.isArray(item)){
        return (
            item.map(x=>(
                <div>
                    {objectName}
                     <ListExercises item={x}/>
                </div>
                ))
        )
       
    }
    if(typeof item === 'string'){
        return <LinkToExercise text={item}/>
    }
    return null
}

const LinkToExercise = ({text}:{text: string}) => {
    return(<Link href={`/home/add-exercise/${text.trim()}`}>{text}</Link>)
}