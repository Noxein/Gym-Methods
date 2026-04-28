'use client'

import { Trainee as TraineeType } from "@/app/types";
import Trainee from "./Trainee";
import { useTranslations } from "next-intl";

type TraineesListProps = {
    trainees: TraineeType[]
}
function TraineesList({ trainees }: TraineesListProps) {

    const t = useTranslations("Home/Profile/My-Trainees")
    return ( 
            <div className=" -mt-2">
                {trainees.length > 0 ? (
                    trainees.map((trainee) => (
                        <Trainee key={trainee.id} trainee={trainee} />
                    ))
                ) : (
                    <p>{t('NoTrainees')}</p>
                )}
            </div>
     );
}

export default TraineesList;