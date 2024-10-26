import { ThemeContext } from "@/app/context/ThemeContext"
import { ExpandIcon, PlusIcon } from "@/app/ui/icons/ExpandIcon"
import { useContext, useState } from "react"
import { Icon } from "../Icon"

type StepTwoOutOfThree = {
    item:any, 
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    stateSetter: React.Dispatch<React.SetStateAction<string[]>>,
    state: string[],
    filterExercises: string[],
    favourite: boolean,
    disableFuncitions?: boolean,
}

export const Mapper = ({item,objectName,currentLevel=0,stateSetter,state,filterExercises,favourite,disableFuncitions = false}:StepTwoOutOfThree) => {
    
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `${currentLevel*3}`

    const theme = useContext(ThemeContext)
    
    const ExpandBtnFunc = () => {
        if(disableFuncitions) return
        setShowChildren(!showChildren)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col bg-${theme?.colorPallete.primary} ${mLeft} font-semibold`}>
            <ExpandBtn 
                text={objectName} 
                isExpanded={showChildren} 
                onClick={ExpandBtnFunc} 
                mLeft={mLeft}
                disableFuncitions={disableFuncitions}
                />

        {showChildren && 
            <div className='flex flex-col font-normal'>
                {item.map((x,index)=>{
                    if(filterExercises.includes(x)) return null
                    return <SelectExercise isFirst={index===0} text={x} mLeft={`ml-${(currentLevel+1)*2}`} key={x} isLast={index+1===item.length} setExercisesToDelete={stateSetter} selected={state.includes(x)} favourite={favourite} disableFuncitions={disableFuncitions}/>
                })}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`flex flex-col bg-${theme?.colorPallete.primary} gap-1 font-bold`}>

            <ExpandBtn 
                text={objectName||''} 
                isExpanded={showChildren} 
                onClick={ExpandBtnFunc} 
                mLeft={mLeft}
                disableFuncitions={disableFuncitions}
                />


            {showChildren && Object.keys(item).map((key,index)=>(
                 <Mapper item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} stateSetter={stateSetter} state={state} filterExercises={filterExercises} favourite={favourite} disableFuncitions={disableFuncitions}/>
            ))}
            

            </div>)
    }
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean,
    mLeft: string,
    disableFuncitions?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,mLeft,disableFuncitions = false,...rest}:ExpandBtn) => {
    const theme = useContext(ThemeContext)

    if(isExpanded) return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} bg-dark border-1 text-marmur border-marmur rounded-lg flex justify-between p-[1px] items-center `}>
            <span className={`flex-1 pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
    
    return (
        text && 
        <button {...rest} className={`text-left ml-${mLeft} text-marmur bg-dark border-marmur border-[1px] rounded-lg flex justify-between p-[1px] items-center`}>
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
    setExercisesToDelete:React.Dispatch<React.SetStateAction<string[]>>,
    selected:boolean,
    favourite: boolean,
    disableFuncitions?: boolean
}
const SelectExercise = ({text,mLeft,isFirst,setExercisesToDelete,selected,favourite,disableFuncitions}:SelectExerciseTypes) => {
    const theme = useContext(ThemeContext)
    const Toggle = () => {
        if(disableFuncitions) return
        setExercisesToDelete(arr=>{
            if(arr.includes(text)) return arr.filter(exercise=>exercise!==text)
            return [...arr,text]
        })
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