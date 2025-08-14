import { BigTrainingStarter } from "@/app/types";
import { Button } from "../../ui/Button";
import { Icon } from "../../Icon";
import { DoubleArrowIcon, ExpandIcon } from "@/app/ui/icons/ExpandIcon";
import FinishedOf from "./FinishedOf";

type LongTermTrainingBtnTypes = {
    training: BigTrainingStarter
}

function LongTermTrainingBtn({training}:LongTermTrainingBtnTypes) {
    return ( 
        <Div>
            <div className="flex justify-between px-2 pt-2">
                <p className="text-xl">{training.name}</p>
                <FinishedOf currentplanindex={training.currentplanindex} total={training.subplans.length}/>
            </div>
            <div className="flex items-center ml-2">

                {training.currentplanindex > 0 && <>
                <div className="border-green  px-2 py-2 rounded-lg flex items-center justify-center text-neutral-400 flex-1 text-center">
                    {training.subplans[training.currentplanindex - 1].name}
                </div>
                <Icon className="px-1">
                    <DoubleArrowIcon fill="#fff" width="20" />
                </Icon>
                </> }

                <div className="border-green text-green px-2 py-2 rounded-lg w-fit flex-1 text-center">
                    {training.subplans[training.currentplanindex].name}
                </div>

                {training.currentplanindex < training.subplans.length-1 && <>
                    <Icon className="px-1">
                        <DoubleArrowIcon fill="#fff" width="20" />
                    </Icon>
                    <div className="border-green  px-2 py-2 rounded-lg flex justify-center items-center text-neutral-400 flex-1 text-center">
                        {training.subplans[training.currentplanindex + 1].name}
                    </div>

                </> }
            </div>
            

        </Div>
 );
}

export default LongTermTrainingBtn;

type DivTypes = {
    children: React.ReactNode
}

const Div = ({children}:DivTypes) => {
    return(
        <div className="w-full border-borderInteractive border-1 rounded-lg bg-darkLight text-white">
            {children}
        </div>
    )
}