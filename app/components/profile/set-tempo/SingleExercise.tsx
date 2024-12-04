import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { SelectedExerciseWithTempo, TempoType } from "@/app/types"
import { PencilIcon, TrashIcon } from "@/app/ui/icons/ExpandIcon"

type SingleExerciseType = {
    text: string,
    mLeft?:string,
    isFirst:boolean,
    tempo:TempoType,
    exerciceid:string,
    setSelectedExercise: React.Dispatch<React.SetStateAction<SelectedExerciseWithTempo>>,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    translatedText: string,
}
export const SingleExercise = ({text,mLeft,isFirst,tempo,exerciceid,translatedText,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal}:SingleExerciseType) => {

    const setExercice = (show:'edit'|'delete') => {
        const exercise = {
            id: exerciceid,
            name: text,
            tempo
        } satisfies SelectedExerciseWithTempo
        HideShowHTMLScrollbar('hide')
        setSelectedExercise(exercise)
        if(show==='edit'){
            return setShowEditTempoModal(true)
        } 
        setShowDeleteTempoModal(true)
    }
    return(
        <div className={`flex-1 text-left ${mLeft} bg-borderInteractive text-marmur border-borderInteractive border-2 rounded-lg flex justify-between ${isFirst?'mt-2':null}`}>
            <span className={`flex-1 bg-dark rounded-lg pl-4 py-2 flex flex-col`}>
                <span>{translatedText}</span>
                <span className="text-sm -mt-1">
                    {tempo.up} - {tempo.uphold} - {tempo.down} - {tempo.downhold}
                </span>
            </span>
            <div className="flex justify-center items-center">
                <Icon onClick={()=>setExercice('edit')}>
                    <PencilIcon fill="#fff" />
                </Icon>
                <Icon onClick={()=>setExercice('delete')}>
                    <TrashIcon fill="#fff"/>
                </Icon>
                
            </div>

        </div>
)
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    
    return (
    <div className={`flex justify-center items-center bg-[dark] rounded-md my-1 ${sClass} px-2 cursor-pointer h-full`} {...rest}>
      {children}
    </div>
    )
  }