import { ExpandIcon, PlusIcon } from "@/app/ui/icons/ExpandIcon"
import { useState } from "react"
import { Icon } from "../../Icon"
import { useTranslations } from "next-intl"
import { nameTrimmer } from "@/app/lib/utils"
import { cn } from "@/app/lib/cn"

type StepTwoOutOfThree = {
    item:any, 
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    stateSetter: (exerciseName: string)=> void
    state: string[],
    filterExercises: string[],
    favourite: boolean
}

export const SettingsMapper = ({item,objectName,currentLevel=0,stateSetter,state,filterExercises,favourite}:StepTwoOutOfThree) => {
    
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `${currentLevel*3}`

    const d = useTranslations("DefaultExercises")
    
    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn 
                text={d(objectName)} 
                isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                mLeft={mLeft}/>

        {showChildren && 
            <div className='flex flex-col font-normal'>
                {item.map((x,index)=>{
                    if(filterExercises.includes(x)) return null
                    return <SelectExercise isFirst={index===0} text={x} mLeft={`ml-${(currentLevel+1)*2}`} key={x} isLast={index+1===item.length} setExercisesToDelete={stateSetter} selected={state.includes(x)} favourite={favourite}/>
                })}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col gap-1 font-bold`}>

            <ExpandBtn 
                text={objectName&&d(objectName)||''} 
                isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                mLeft={mLeft}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <SettingsMapper item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} stateSetter={stateSetter} state={state} filterExercises={filterExercises} favourite={favourite}/>
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

    if(isExpanded) return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} bg-marmur text-marmur border-marmur  rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#d9d9d9'}/>
            </Icon>
        </button>
    )
    
    return (
        text && 
        <button {...rest} className={`text-left ml-${mLeft} text-marmur bg-dark border-marmur border-1 rounded-lg flex justify-between p-[1px] items-center`}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center`}>
                <ExpandIcon  expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
}

type SelectExerciseTypes = {
    text: string,
    mLeft:string,
    isFirst:boolean,
    isLast:boolean,
    setExercisesToDelete: (exerciseName: string) => void
    selected:boolean,
    favourite: boolean
}
const SelectExercise = ({text,mLeft,isFirst,setExercisesToDelete,selected,favourite}:SelectExerciseTypes) => {
    const Toggle = () => {
        setExercisesToDelete(text)
    }
    const getFillColor = () => {
        if(selected){
            console.log('something is selected')
            if(favourite) return `bg-green border-green`
            return `bg-red border-red`
        }
        return `bg-marmur border-marmur`
    }

    const d = useTranslations("DefaultExercises")

    const addOnClass = getFillColor()
    const fill = selected?`#fff`:`#0D1317`


    return(
        <button className={cn(`relative text-left ml-12 mt-1 text-marmur border-[1px] rounded flex justify-between items-center ${isFirst?'mt-2':null}`,addOnClass)} onClick={Toggle}>
            <span className={`flex-1 bg-dark rounded-md pl-4 py-2 flex flex-col`}>
                {d(nameTrimmer(text))}
            </span>
            <Icon className="flex items-center px-1">
                <PlusIcon fill={fill}/>
            </Icon>
        </button>
)
}