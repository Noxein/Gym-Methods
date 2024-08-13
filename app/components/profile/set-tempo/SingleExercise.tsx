import { ThemeContext } from "@/app/context/ThemeContext"
import { SelectedExerciseWithTempo, TempoType } from "@/app/types"
import { PencilIcon, TrashIcon } from "@/app/ui/icons/ExpandIcon"
import { useContext } from "react"

type SingleExerciseType = {
    text: string,
    mLeft?:string,
    isFirst:boolean,
    tempo:TempoType,
    exerciceid:string,
    setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
}
export const SingleExercise = ({text,mLeft,isFirst,tempo,exerciceid,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:SingleExerciseType) => {
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