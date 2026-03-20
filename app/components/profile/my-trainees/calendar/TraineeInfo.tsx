'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { Trainee } from "@/app/types";
import { useContext } from "react";

type TraineeInfoProps = {
    info?: Trainee,
    children?: React.ReactNode
}
function TraineeInfo({ info,children }: TraineeInfoProps) {
    const trainee = info ? info : useContext(CreateTrainingContext)!.userData;
    return ( 
        <div className=" p-4 text-white  bg-darkLight rounded-lg mx-5 mt-5">
            <div className="flex items-center">
                <img src={trainee.avatarurl} alt={trainee.username} className="w-16 h-16 rounded-lg" />
                <p className="ml-4 text-xl">{trainee.username}</p>
            </div>
            {children}
        </div>
     );
}

export default TraineeInfo;