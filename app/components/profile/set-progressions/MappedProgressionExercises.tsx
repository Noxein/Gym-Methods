'use client'
import { Progression, SelectedExerciseWithTempo, TempoType, UserExerciseTempoReturnType } from "@/app/types"
import { ExpandIcon } from "@/app/ui/icons/ExpandIcon"
import { useState } from "react"
import { Icon } from "../../Icon"
import { useTranslations } from "next-intl"
import { nameTrimmer } from "@/app/lib/utils"
import { SingleExercise } from "./SingleExercise"

const defaultTempo = {
    up:0,
    uphold:0,
    down:0,
    downhold:0 
} satisfies TempoType

type MappedProgressionExercisesTypes = {
    item:any,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    progressions:Progression[],
    setSelectedExercise: React.Dispatch<React.SetStateAction<Progression|undefined>>,
    setShowEditTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal:React.Dispatch<React.SetStateAction<boolean>>,
}
export const MappedProgressionExercises = ({item,objectName,currentLevel=0,isLast=true,progressions,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:MappedProgressionExercisesTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`
    
    const t = useTranslations("Home/Profile/Set-Tempo")
    const d = useTranslations("DefaultExercises")

    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={t("YourExercises")} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>
            {showChildren && item.map((x:Progression,index:number)=>(    
            <SingleExercise text={x.exercisename} mLeft={`ml-10`} key={x.id} isFirst={index===0} translatedText={x.exercisename} progression={x} exerciceid={x.id} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal} progressions={progressions}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn text={d(objectName)} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>

        {showChildren && <div className='flex flex-col gap-2 font-normal'>
                {item.map((x,index)=>(       
                        <SingleExercise translatedText={d(nameTrimmer(x))} text={x} mLeft={`ml-10`} key={x} isFirst={index===0} progression={x} exerciceid={x} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal} progressions={progressions}/>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName && d(objectName) || ''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <MappedProgressionExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} progressions={progressions} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
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
        <button {...rest} className={`relative text-left ml-${mLeft} bg-borderInteractive text-marmur border-borderInteractive border-2 rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#fff'}/>
            </Icon>
        </button>
    )
    return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} text-marmur bg-borderInteractive border-borderInteractive border-2 rounded-lg flex justify-between p-[1px] items-center`}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon  expanded={isExpanded} fill={'#fff'}/>
            </Icon>
        </button>
    )
}