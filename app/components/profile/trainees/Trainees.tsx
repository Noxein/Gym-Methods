'use client'
import { Trainee } from "@/app/types";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type TraineesProps = {
    trainees: Trainee[]
}

function Trainees({trainees}:TraineesProps) {
    const p = useTranslations("Home/Profile")
    const t = useTranslations("Home/Profile/My-Trainees")

    const[traineesState,setTraineesState] = useState<Trainee[]>(trainees)

    const router = useRouter()

    return ( 
        <div className="text-white">
            <h1 className="text-2xl font-bold">{p("MyTrainees")}</h1>

            <Button onClick={()=>router.push('')}>{t("AddTrainee")}</Button>

            <div>
                {traineesState.length > 0 ? (
                    traineesState.map((trainee) => (
                        <div key={trainee.username} className="flex items-center space-x-4">
                            <img src={trainee.avatarurl} alt={trainee.username} className="w-10 h-10 rounded-full" />
                            <span>{trainee.username}</span>
                        </div>
                    ))
                ) : (
                    <p>{t("NoTrainees")}</p>
                )}
            </div>
        </div>
     );
}

export default Trainees;
