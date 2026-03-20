'use client'

import { Trainee as TraineeType } from "@/app/types";
import Trainee from "./Trainee";

type TraineesListProps = {
    trainees: TraineeType[]
}
function TraineesList({ trainees }: TraineesListProps) {
    return ( 
            <div className=" -mt-2">
                {trainees.length > 0 ? (
                    trainees.map((trainee) => (
                        <Trainee key={trainee.id} trainee={trainee} />
                    ))
                ) : (
                    <p>Brak podopiecznych.</p>
                )}
            </div>
     );
}

export default TraineesList;