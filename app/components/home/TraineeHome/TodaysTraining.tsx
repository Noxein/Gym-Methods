'use client'
import { TraineePlan } from "@/app/types";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
    training: TraineePlan
    currentDay: number
    planLength: number
}

function TodaysTraining({ training, currentDay, planLength }: Props) {
    const t = useTranslations("Home/TraineeHome")
        
    const minTime2 = training.plan[currentDay].exercises.reduce((min, exercise) =>{
        return min + exercise.sets.length * 180
    },0)

    const timeInHoursWithPartial = Math.floor(minTime2 / 3600) + (minTime2 % 3600) / 3600

    const router = useRouter()

    const handleStart = () => {
        router.push(`/home/start-training/trainee/${training.id}`)
    }

    return (                 
        <div key={training.id}>
            <div className="text-lg">
                <p>{t("DayProgress", {trainingName: training.plan.find(x => x.iscompleted === false)!.name, current: currentDay + 1, total: planLength})}</p>
                <p className="text-gray-400">{t("TimeRange", {start: timeInHoursWithPartial, end: timeInHoursWithPartial + 0.5})}</p>
                <Button isPrimary className="w-full mt-5" onClick={handleStart}>{t("StartTraining")}</Button>
            </div>
        </div> );
}

export default TodaysTraining;
