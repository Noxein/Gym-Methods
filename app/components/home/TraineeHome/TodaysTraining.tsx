'use client'
import { TraineePlan } from "@/app/types";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";

type Props = {
    training: TraineePlan
    currentDay: number
    planLength: number
}

function TodaysTraining({ training, currentDay, planLength }: Props) {
        
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
                <p>{training.plan.find(x => x.iscompleted === false)!.name} - Dzień {currentDay+1} / {planLength}</p>
                <p className="text-gray-400">Czas {timeInHoursWithPartial}h - {timeInHoursWithPartial+0.5}h</p>
                <Button isPrimary className="w-full mt-5" onClick={handleStart}>ZACZNIJ TRENING</Button>
            </div>
        </div> );
}

export default TodaysTraining;