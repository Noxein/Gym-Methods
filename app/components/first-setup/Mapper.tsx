import { ThemeContext } from "@/app/context/ThemeContext"
import { ExpandIcon } from "@/app/ui/icons/ExpandIcon"
import { useContext, useState } from "react"

type StepTwoOutOfThree = {
    item:any, 
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    stateSetter: React.Dispatch<React.SetStateAction<string[]>>,
    state: string[],
    filterExercises: string[]
}

export const Mapper = ({item,objectName,currentLevel=0,isLast=true,stateSetter,state,filterExercises}:StepTwoOutOfThree) => {
    
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `ml-${currentLevel*2}`

    const theme = useContext(ThemeContext)
    

    if(Array.isArray(item)){
        const bgColor = `bg-${theme?.colorPallete.primary} ${isLast?null:'border-b-2 border-white'}`
        return (<div className={`flex flex-col ${bgColor} ${mLeft} font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ml-2 flex justify-between pr-4 py-2 text-[${theme?.colorPallete.accent}]`}/>

        {showChildren && <div className='flex flex-col gap-[2px] font-normal'>
                {item.map((x,index)=>{
                    if(filterExercises.includes(x)) return null
                        return <SelectExercise text={x} mLeft={`ml-${(currentLevel+1)*2}`} key={x} isLast={index+1===item.length} setExercisesToDelete={stateSetter} selected={state.includes(x)}/>
            })}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        const bgColor = `bg-${theme?.colorPallete.primary} ${objectName?'border-b-2 border-white':null}`
        return (<div className={`flex flex-col ${bgColor} gap-1 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] flex justify-between pr-4 py-2`}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <Mapper item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} stateSetter={stateSetter} state={state} filterExercises={filterExercises}/>
            ))}
            

            </div>)
    }
}

type ExpandBtn = {
    text?:string,
    isExpanded:boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ExpandBtn = ({text,isExpanded,...rest}:ExpandBtn) => {
    const theme = useContext(ThemeContext)

    return (
        text && <button {...rest}>
            <span>{text}</span>

            <ExpandIcon expanded={isExpanded} themeColor={theme?.colorPallete.accent}/>

        </button>
    )
}

const SelectExercise = ({text,mLeft,isLast,setExercisesToDelete,selected}:{text: string,mLeft:string,isLast:boolean,setExercisesToDelete:React.Dispatch<React.SetStateAction<string[]>>,selected:boolean}) => {
    const theme = useContext(ThemeContext)
    const Toggle = () => {
        setExercisesToDelete(arr=>{
            if(arr.includes(text)) return arr.filter(exercise=>exercise!==text)
            return [...arr,text]
        })
    }
    return(
        <button className={`${selected?"bg-blue-400":null} text-left ${mLeft} py-1 pl-2 text-[${theme?.colorPallete.accent}] ${!isLast?'border-b-2 border-white':null}`} onClick={Toggle}>
            {text}
        </button>
)
}