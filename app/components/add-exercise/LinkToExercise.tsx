import { ThemeContext } from "@/app/context/ThemeContext"
import Link from "next/link"
import { useContext } from "react"

type LinkToExerciseType = {
    text: string,
    mLeft: string,
    isFirst: boolean,
}
export const LinkToExercise = ({text,mLeft,isFirst}:LinkToExerciseType) => {
    const theme = useContext(ThemeContext)

    return(
        <Link className={`text-left ${mLeft} bg-[${theme?.colorPallete.secondary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-2 rounded flex justify-between ${isFirst?'mt-2':null}`} href={`/home/add-exercise/${text.trim()}`}>
            <span className={`flex-1 bg-[${theme?.colorPallete.primary}] rounded-md pl-4 py-2 flex flex-col`}>
                {text}
            </span>
        </Link>
)
}