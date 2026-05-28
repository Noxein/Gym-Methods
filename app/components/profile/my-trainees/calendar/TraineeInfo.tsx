'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { cn } from "@/app/lib/cn";
import { Trainee } from "@/app/types";
import { DetailedHTMLProps, HTMLAttributes, useContext } from "react";

interface TraineeInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    info?: Trainee,
    children?: React.ReactNode
}
function TraineeInfo({ info,children,className, ...props }: TraineeInfoProps) {
    const trainee = info ? info : useContext(CreateTrainingContext)!.userData;
    return ( 
        <div className={cn(" text-white  ", className)} {...props}>
            <div className="flex items-center">
                <img src={trainee.avatarurl} alt={trainee.username} className="w-16 h-16 rounded-lg" />
                <p className="ml-4 text-xl">{trainee.username}</p>
            </div>
            {children}
        </div>
     );
}

export default TraineeInfo;