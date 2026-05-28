'use client'

import { Trainee as TraineeType } from "@/app/types";
import { Button } from "../../ui/Button";
import { ExpandIcon2 } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { useState } from "react";
import TraineeManageButtons from "./TraineeManageButtons";

type TraineeProps = {
    trainee: TraineeType
}
function Trainee({ trainee }: TraineeProps) {

    const[expanded,setExpanded] = useState(false)
    
    return ( 
        <div key={trainee.username} className={`flex flex-col w-full bg-darkLight rounded-lg p-4`}>
            <div className="flex items-center gap-4" onClick={() => setExpanded(!expanded)}>
                <img src={trainee.avatarurl} alt={trainee.username} className="w-10 h-10 rounded-full" />
                <span>{trainee.username}</span>

                <Icon className="ml-auto">
                    <ExpandIcon2 expanded={!expanded}/>
                </Icon>
            </div>
            <div className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-[grid-template-rows] duration-300`}>
                <div className="overflow-hidden flex flex-col gap-2">
                    <TraineeManageButtons id={trainee.id}/>
                </div>

            </div>
        </div>
     );
}

export default Trainee;