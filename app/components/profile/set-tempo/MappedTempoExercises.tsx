'use client'
import { ThemeContext } from "@/app/context/ThemeContext"
import { ExerciceTypes, SelectedExerciseWithTempo, TempoType, UserExerciseTempoReturnType } from "@/app/types"
import { ExpandIcon, PencilIcon, TrashIcon } from "@/app/ui/icons/ExpandIcon"
import Link from "next/link"
import { useContext, useState } from "react"

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

    const theme = useContext(ThemeContext)
    
    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={'Twoje ćwiczenia'} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(    
            <LinkToExercise text={x.exercisename} mLeft={`ml-10`} key={x.id} isFirst={index===0} tempo={tempos[x.id]?.tempo?tempos[x.id]?.tempo:defaultTempo} exerciceid={x.id} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`flex flex-col ${mLeft} font-semibold`}>
            <ExpandBtn text={objectName} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>

        {showChildren && <div className='flex flex-col gap-2 font-normal'>
                {item.map((x,index)=>(       
                        <LinkToExercise text={x} mLeft={`ml-10`} key={x} isFirst={index===0} tempo={tempos[x]?.tempo?tempos[x]?.tempo:defaultTempo} exerciceid={x} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
                    ))}
            </div>}
        </div>)
       
    }

    if(typeof item === 'object'){
        //const bgColor = `bg-${theme?.colorPallete.primary} ${objectName?'border-b-2 border-white':null}`
        return (<div className={`flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} 
                className={`text-left ${mLeft}  text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between pl-4 py-2`}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <MappedTempoExercises item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} tempos={tempos} setSelectedExercise={setSelectedExercise} setShowEditTempoModal={setShowEditTempoModal} setShowDeleteTempoModal={setShowDeleteTempoModal}/>
            ))}
            

            </div>)
    }
}

type LinkToExerciseType = {
    text: string,
    mLeft:string,
    isFirst:boolean,
    tempo:TempoType,
    exerciceid:string,
    setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
}
const LinkToExercise = ({text,mLeft,isFirst,tempo,exerciceid,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:LinkToExerciseType) => {
    const theme = useContext(ThemeContext)
    const setExercice = (show:'edit'|'delete') => {
        console.log(show)
        const exercise = {
            id: exerciceid,
            name: text,
            tempo
        } satisfies SelectedExerciseWithTempo

        setSelectedExercise(exercise)
        if(show==='edit'){
            console.log('edited')
            return setShowEditTempoModal(true)
        } 
        setShowDeleteTempoModal(true)
    }
        
    return(
        <div className={`text-left ${mLeft} bg-[${theme?.colorPallete.secondary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between ${isFirst?'mt-2':null}`}>
            <span className={`flex-1 bg-[${theme?.colorPallete.primary}] rounded-md pl-4 py-2 flex flex-col`}>
                <span>{text}</span>
                <span className="text-sm text-gray-500 -mt-1">
                    {tempo.up} - {tempo.uphold} - {tempo.down} - {tempo.downhold}
                </span>
            </span>
            <div className="flex gap-1 pr-1 justify-center items-center">
                <Icon sClass={'ml-1'} onClick={()=>setExercice('edit')}>
                    <PencilIcon/>
                </Icon>
                <Icon onClick={()=>setExercice('delete')}>
                    <TrashIcon/>
                </Icon>
                
            </div>

        </div>
)
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const theme = useContext(ThemeContext)
    
    return (
    <div className={`flex justify-center items-center bg-[${theme?.colorPallete.primary}] rounded-md my-1 ${sClass} px-2 cursor-pointer h-full`} {...rest}>
      {children}
    </div>
    )
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