import Link from "next/link"
import { Icon } from "../Icon"
import { PlusIcon } from "@/app/ui/icons/ExpandIcon" 
import { TempoType } from "@/app/types";
import { ExerciseTempo } from "../ui/ExerciseTempo";
 
type LinkToExerciseType = {
    text: string,
    mLeft: string,
    isFirst: boolean,
    leadTo: string,
    tempo?: TempoType,
}
export const LinkToExercise = ({text,mLeft,isFirst,leadTo,tempo}:LinkToExerciseType) => {

    return(
        <Link className={`relative text-left ml-${mLeft} bg-borderInteractive text-marmur border-borderInteractive border-[2px] rounded flex justify-between ${isFirst?'mt-2':null}`} href={`/home/add-exercise/${leadTo.trim()}`}>
            <span className={`flex-1 bg-dark rounded-md pl-4 py-2 flex flex-col text-lg`}>
                {text}
            </span>
            <Icon className="flex items-center px-1">
                <PlusIcon fill="#fff"/>
            </Icon>
        </Link>
)
}