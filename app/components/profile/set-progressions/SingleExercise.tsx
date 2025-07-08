import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import { Progression, SelectedExerciseWithTempo, TempoType } from "@/app/types"
import { PencilIcon, TrashIcon } from "@/app/ui/icons/ExpandIcon"
import { v4 as uuidv4 } from 'uuid';

type SingleExerciseType = {
    text: string,
    mLeft?:string,
    isFirst:boolean,
    progression:Progression,
    exerciceid:string,
    setSelectedExercise: React.Dispatch<React.SetStateAction<Progression|undefined>>,
    setShowEditTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteTempoModal: React.Dispatch<React.SetStateAction<boolean>>,
    translatedText: string,
    progressions:Progression[],
}
export const SingleExercise = ({text,mLeft,isFirst,progression,exerciceid,translatedText,setSelectedExercise,setShowEditTempoModal,setShowDeleteTempoModal,progressions}:SingleExerciseType) => {

    const setExercice = (show:'edit'|'delete') => {
        HideShowHTMLScrollbar('hide')

        setSelectedExercise(lookerForProgression(text))
        if(show==='edit'){
            return setShowEditTempoModal(true)
        } 
        setShowDeleteTempoModal(true)
    }
    const lookerForProgression = (exercisename:string) => {
        const index = progressions.findIndex(item=>item.exercisename === text)
        if(index !== -1) return progressions[index]

        let obj:Progression = {
            exerciseid: exerciceid,
            exercisename: text,
            id: uuidv4(),
            series:[],
            userid: ''
        }
        return obj
    }
    return(
        <div className={`flex-1 text-left ${mLeft} bg-borderInteractive text-marmur border-borderInteractive border-2 rounded-lg flex justify-between ${isFirst?'mt-2':null}`}>
            <span className={`flex-1 bg-dark rounded-lg pl-4 py-2 flex flex-col`}>
                <span>{translatedText}</span>
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