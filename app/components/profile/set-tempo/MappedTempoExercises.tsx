'use client'
import { SelectedExerciseWithTempo, TempoType, UserExerciseTempoReturnType } from "@/app/types"
import { ExpandIcon } from "@/app/ui/icons/ExpandIcon"
import { useState } from "react"
import { SingleExercise } from "./SingleExercise"
import { Icon } from "../../Icon"

const defaultTempo = {
    up:0,
    uphold:0,
    down:0,
    downhold:0 
} satisfies TempoType

type MappedTempoExercisesTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    tempos:UserExerciseTempoReturnType,
    setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
    setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const MappedTempoExercises = ({item,objectName,currentLevel=0,isLast=true,tempos,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:MappedTempoExercisesTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`
    
    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={'Twoje ćwiczenia'} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(    
            <SingleExercise text={x.exercisename} mLeft={`ml-10`} key={x.id} isFirst={index===0} tempo={tempos[x.id]?.tempo?tempos[x.id]?.tempo:defaultTempo} exerciceid={x.id} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>

        {showChildren && <div className='flex flex-col gap-2 font-normal'>
                {item.map((x,index)=>(       
                        <SingleExercise text={x} mLeft={`ml-10`} key={x} isFirst={index===0} tempo={tempos[x]?.tempo?tempos[x]?.tempo:defaultTempo} exerciceid={x} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <MappedTempoExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} tempos={tempos} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
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
        <button {...rest} className={`relative text-left ml-${mLeft} bg-dark text-marmur border-marmur border-1 rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
    return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} text-marmur bg-dark border-marmur border-1 rounded-lg flex justify-between p-[1px] items-center`}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon  expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
}