import { GetOverallTraineeTrainingProgression } from "@/app/lib/utils";
import { TraineesAndTrainings } from "@/app/types";
import { format } from "date-fns";
import StudentAvatar from "./StudentAvatar";

type Props = {
    info: TraineesAndTrainings
}

function Student({ info }: Props) {

    const lastCompletedTrainingIndex = info.plan?.findIndex(plan => plan.iscompleted === false) - 1 
    const lastTrainingDate = lastCompletedTrainingIndex !== -1 ? info.plan?.[lastCompletedTrainingIndex].date : null
    const progression = lastTrainingDate ? GetOverallTraineeTrainingProgression(info.plan[lastCompletedTrainingIndex]) : null

    return ( 
        <div className="flex gap-2 w-full bg-darkLight rounded-lg">
            { progression && <div className={`w-2 rounded-tl-lg rounded-bl-lg ${progression === 'progressive' ? 'bg-green' : progression === 'regressive' ? 'bg-red' : progression === 'neutral' ? 'bg-gray-500' : ''}`}>

            </div>}
            <StudentAvatar info={{avatarurl: info.avatarurl}}/>

            <div className="flex flex-col mt-2">
                <p>{info.username}</p>
                {lastTrainingDate && <p>Last training: {format(new Date(lastTrainingDate), "dd/MM/yyyy")}</p>}

                <p className="text-gray-400">{info.name} - Day {lastCompletedTrainingIndex + 2}/{info.plan.length}</p>
            </div>
        </div>
     );
}

export default Student;