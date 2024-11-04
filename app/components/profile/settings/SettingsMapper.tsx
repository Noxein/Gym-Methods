import { ThemeContext } from "@/app/context/ThemeContext"
import { ExpandIcon, PlusIcon } from "@/app/ui/icons/ExpandIcon"
import { useContext, useState } from "react"
import { Icon } from "../../Icon"

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

    const theme = useContext(ThemeContext)
    

    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn 
                text={objectName} 
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
                text={objectName||''} 
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
    const theme = useContext(ThemeContext)

    if(isExpanded) return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-marmur  rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={theme?.colorPallete.accent}/>
            </Icon>
        </button>
    )
    
    return (
        text && 
        <button {...rest} className={`text-left ml-${mLeft} text-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} border-marmur border-1 rounded-lg flex justify-between p-[1px] items-center`}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} pl-4 py-2 rounded-lg`}>{text}</span>

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
    const theme = useContext(ThemeContext)
    const Toggle = () => {
        setExercisesToDelete(text)
    }
    const getFillColor = () => {
        if(selected){
            if(favourite) return `bg-green border-green`
            return `bg-red border-red`
        }
        return `bg-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary}`
    }

    const addOnClass = getFillColor()
    const fill = selected?`#fff`:`#0D1317`


    return(
        <button className={`relative text-left ml-12 mt-1 ${addOnClass} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} border-[1px] rounded flex justify-between items-center ${isFirst?'mt-2':null}`} onClick={Toggle}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} rounded-md pl-4 py-2 flex flex-col`}>
                {text}
            </span>
            <Icon className="flex items-center px-1">
                <PlusIcon fill={fill}/>
            </Icon>
        </button>
)
}