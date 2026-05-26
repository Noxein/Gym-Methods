'use client'
import { GetOverallTraineeTrainingProgression } from "@/app/lib/utils";
import { TraineesAndTrainings } from "@/app/types";
import { format, startOfDay } from "date-fns";
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

    const currentTrainingIndex = info.plan.findIndex(plan => plan.iscompleted === false)
    const currentTraining = currentTrainingIndex !== -1 ? info.plan[currentTrainingIndex] : null
    const lastCompletedTrainingIndex = currentTrainingIndex - 1
    const lastCompletedTraining = lastCompletedTrainingIndex >= 0 ? info.plan[lastCompletedTrainingIndex] : null
    const progression = lastCompletedTraining ? GetOverallTraineeTrainingProgression(lastCompletedTraining) : null
    const skippedTrainingsCount = info.plan.filter(plan => !plan.iscompleted && startOfDay(new Date(plan.date)) < startOfDay(new Date())).length
    const shouldDisplayNextTraining = currentTraining
        ? startOfDay(new Date(currentTraining.date)) >= startOfDay(new Date())
        : false


    const { connectedTrainees } = useContext(TraineeHomeContext)!

    const router = useRouter()

    const connectToTraining = () => {
        router.push(`/home/start-training/trainee/${info.id}`)
    }
    const redirectToTraineeCalendar = () => {
        router.push(`/home/profile/my-trainees/${info.traineeid}/calendar`)
    }
    return ( 
        <div className="flex gap-2 w-full bg-darkLight rounded-lg">
            { progression && <div className={`w-2 rounded-tl-lg rounded-bl-lg ${progression === 'progressive' ? 'bg-green' : progression === 'regressive' ? 'bg-red' : progression === 'neutral' ? 'bg-gray-500' : ''}`}>

            </div>}
            <StudentAvatar info={{avatarurl: info.avatarurl}}/>

            <div className="flex flex-col mt-2">
                <p>{info.username} {connectedTrainees.includes(info.traineeid) && <span className="text-gray-500 text-sm">{t("UserInTraining")}</span>}</p>
               {lastCompletedTraining?.date && <p>{t("LastTraining", {date: format(new Date(lastCompletedTraining.date), "dd/MM/yyyy")})}</p>}

                {currentTraining && <p className="text-gray-400">{t("DayProgress", {trainingName: info.name, current: currentTrainingIndex + 1, total: info.plan.length})}</p>}
                {shouldDisplayNextTraining && currentTraining?.date && <p className="text-gray-400">{t('NextTraining', {date: format(new Date(currentTraining.date), "dd.MM")})}</p>}
                {skippedTrainingsCount > 0 && <p className="text-red cursor-pointer hover:underline" onClick={redirectToTraineeCalendar}>{t("SkippedTrainings", {count: skippedTrainingsCount})}</p>}
            </div>

            {connectedTrainees.includes(info.traineeid) && <Button className="ml-auto h-12 self-center mr-2 px-4" onClick={connectToTraining}>{t("Connect")}</Button>}
        </div>
     );
}

export default Student;
