'use client'
import { GetOverallTraineeTrainingProgression } from "@/app/lib/utils";
import { TraineesAndTrainings } from "@/app/types";
import { format } from "date-fns";
import StudentAvatar from "./StudentAvatar";
import TraineeHomeContext from "./TrainerHomeContext";
import { useContext } from "react";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
    info: TraineesAndTrainings
}

function Student({ info }: Props) {
    const t = useTranslations("Home/TrainerHome")

    const lastCompletedTrainingIndex = info.plan?.findIndex(plan => plan.iscompleted === false) - 1 
    const lastTrainingDate = lastCompletedTrainingIndex !== -1 ? info.plan?.[lastCompletedTrainingIndex].date : null
    const progression = lastTrainingDate ? GetOverallTraineeTrainingProgression(info.plan[lastCompletedTrainingIndex]) : null

    const { connectedTrainees } = useContext(TraineeHomeContext)!

    const router = useRouter()

    const connectToTraining = () => {
        router.push(`/home/start-training/trainee/${info.id}`)
    }
    return ( 
        <div className="flex gap-2 w-full bg-darkLight rounded-lg">
            { progression && <div className={`w-2 rounded-tl-lg rounded-bl-lg ${progression === 'progressive' ? 'bg-green' : progression === 'regressive' ? 'bg-red' : progression === 'neutral' ? 'bg-gray-500' : ''}`}>

            </div>}
            <StudentAvatar info={{avatarurl: info.avatarurl}}/>

            <div className="flex flex-col mt-2">
                <p>{info.username} {connectedTrainees.includes(info.traineeid) && <span className="text-gray-500 text-sm">{t("UserInTraining")}</span>}</p>
                {lastTrainingDate && <p>{t("LastTraining", {date: format(new Date(lastTrainingDate), "dd/MM/yyyy")})}</p>}

                <p className="text-gray-400">{t("DayProgress", {trainingName: info.name, current: lastCompletedTrainingIndex + 2, total: info.plan.length})}</p>
            </div>

            {connectedTrainees.includes(info.traineeid) && <Button className="ml-auto h-12 self-center mr-2 px-4" onClick={connectToTraining}>{t("Connect")}</Button>}
        </div>
     );
}

export default Student;
