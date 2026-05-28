'use client'
import { ExpandIcon, PlusIcon } from "@/app/ui/icons/ExpandIcon"
import { useState } from "react"
import { Icon } from "../Icon" 
import { useTranslations } from "next-intl"
import { nameTrimmer } from "@/app/lib/utils"

type ListExercisesTypes = {
    item:any,
    clickHandler: (exercisename:string) => void,
    childrenIcons?: React.ReactNode,
    objectName?:string,
    currentLevel?:number,
    isLast?:boolean,
    favouriteExercises?: string[],
    exercisesToDelete?: string[],
    isFav?: boolean,
}
export const DefaultExercisesMap = ({item,clickHandler,objectName,currentLevel=0,isLast=true,childrenIcons,favouriteExercises,exercisesToDelete,isFav}:ListExercisesTypes) => {
    const[showChildren,setShowChildren] = useState(currentLevel===0)
    const mLeft = `${currentLevel*3}`

    const d = useTranslations("DefaultExercises")

    if(objectName === 'userExercises' && Array.isArray(item)){
        return (<div className={`relative flex flex-col gap-1 font-bold`}>
            <ExpandBtn text={d('TwojeCwiczenia')} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}
                />
            {showChildren && item.map((x:{exercisename:string,id:string},index:number)=>(
            <LinkToExercise isFirst={index===0} mLeft={'6'} key={x.id} text={x.exercisename} translatedText={x.exercisename} clickHandler={clickHandler} childrenIcons={childrenIcons} favouriteExercises={favouriteExercises} exercisesToDelete={exercisesToDelete} isFav={isFav}/>
        ))}
    </div>)
    }
    if(Array.isArray(item)){
        return (<div className={`relative flex flex-col font-semibold`}>
            <ExpandBtn text={d(objectName!)} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>

        {showChildren && <div className='flex flex-col font-normal'>
                {item.map((x,index)=>(       
                        <LinkToExercise isFirst={index===0} mLeft='12' key={x} text={x} translatedText={d(nameTrimmer(x))} clickHandler={()=>clickHandler(x)} childrenIcons={childrenIcons} favouriteExercises={favouriteExercises} exercisesToDelete={exercisesToDelete} isFav={isFav}/>
                    ))}
            </div>}

        </div>)
       
    }

    if(typeof item === 'object'){
        return (<div className={`relative flex flex-col gap-3 font-bold`}>

            <ExpandBtn text={objectName&&d(objectName)||''} isExpanded={showChildren} 
                onClick={()=>setShowChildren(!showChildren)} mLeft={mLeft} currentLevel={currentLevel}/>


            {showChildren && Object.keys(item).map((key,index)=>(
                 <DefaultExercisesMap item={item[key]} objectName={Object.keys(item)[index]} key={key} currentLevel={currentLevel+1} isLast={index+1===Object.keys(item).length} clickHandler={clickHandler} childrenIcons={childrenIcons} favouriteExercises={favouriteExercises} exercisesToDelete={exercisesToDelete} isFav={isFav}/>
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
        <button {...rest} className={`relative text-left ml-${mLeft} text-marmur bg-borderInteractive rounded-lg flex justify-between p-[2px] items-center `}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon expanded={isExpanded} fill={'#d9d9d9'}/>
            </Icon>
        </button>
    )
    return (
        text && 
        <button {...rest} className={`relative text-left ml-${mLeft} text-marmur bg-borderInteractive rounded-lg flex justify-between p-[2px] items-center`}>
            <span className={`flex-1 bg-dark pl-4 py-2 rounded-lg`}>{text}</span>

            <Icon className={`flex items-center is`}>
                <ExpandIcon  expanded={isExpanded} fill={'#D9D9D9'}/>
            </Icon>
        </button>
    )
}

type LinkToExerciseType = {
    clickHandler: (exerciseName:string) => void,
    childrenIcons?: React.ReactNode,
    text: string,
    mLeft: string,
    isFirst: boolean,
    favouriteExercises?: string[],
    exercisesToDelete?: string[],
    isFav?: boolean
    translatedText: string,
}

const LinkToExercise = ({clickHandler,childrenIcons,text,translatedText,mLeft,isFirst,favouriteExercises,exercisesToDelete,isFav}:LinkToExerciseType) => {

    const shouldRenderExercise = () => {
        if(isFav){
            if(exercisesToDelete?.includes(text)){
                return false;
            } else {
                return true;
            }
        }
        if(favouriteExercises?.includes(text)){
            return false;
        } else {
            return true;
        }
    }

    if(!shouldRenderExercise()) return null;

    let color = favouriteExercises && favouriteExercises.includes(text) ? 'green' : exercisesToDelete && exercisesToDelete.includes(text) ? 'red' : 'borderInteractive';
    return(
        <div className={`relative text-left ml-${mLeft}  border-${color} bg-${color} text-marmur  border-[2px] rounded flex justify-between mt-2`}  onClick={()=>clickHandler(text)}>
            <span className={`flex-1 bg-dark rounded-md pl-4 py-2 flex flex-col text-lg `}>
                {translatedText}
            </span>
            {childrenIcons}
        </div>
)
}