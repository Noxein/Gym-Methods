import { ThemeContext } from "@/app/context/ThemeContext"
import Link from "next/link"
import { useContext } from "react"
import { Icon } from "../Icon"
import { PlusIcon } from "@/app/ui/icons/ExpandIcon"

type LinkToExerciseType = {
    text: string,
    mLeft: string,
    isFirst: boolean,
}
export const LinkToExercise = ({text,mLeft,isFirst}:LinkToExerciseType) => {
    const theme = useContext(ThemeContext)

    return(
        <Link className={`relative text-left ml-${mLeft} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} border-[1px] rounded flex justify-between ${isFirst?'mt-2':null}`} href={`/home/add-exercise/${text.trim()}`}>
            <span className={`flex-1 bg-${theme?.colorPallete.primary} rounded-md pl-4 py-2 flex flex-col`}>
                {text}
            </span>
            <Icon className="flex items-center px-1">
                <PlusIcon fill="#0D1317"/>
            </Icon>
        </Link>
)
}