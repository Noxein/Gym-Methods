import { ProgressionType2 } from "@/app/types";
import { useTranslations } from "next-intl";

type SingleProgressionTypes = {
    progression: ProgressionType2[],
    goal?: string
}

function SingleProgression({progression, goal}:SingleProgressionTypes) {
    const t = useTranslations("Home/TraineeHome")

    const PrecentageIncreaseOrDecrease = () => {
        const weightDifference = progression[0].set.weight - progression[1].set.weight
        const percentage = (weightDifference / progression[1].set.weight) * 100
        // what if weightDifference is 0? then return 0
        if(weightDifference === 0) return{
            percentage: '0%',
            color: 'text-gray-400',
            icon: 'none'
        } 
        // what if weightDifference is negative? then return negative percentage
        if(weightDifference < 0) return {
            percentage: `- ${Math.abs(percentage).toFixed(2)}%`,
            color: 'text-red',
            bg: 'bg-red',
            icon: 'down'
        }
        return {
            percentage: `+ ${percentage.toFixed(2)}%`,
            color: 'text-green',
            bg: 'bg-green',
            icon: 'up'
        }
    }

    const data = PrecentageIncreaseOrDecrease()

    const goalProgressionPrecentage = progression[0].set.weight / parseInt(goal || '0') * 100

    console.log(progression[0].set.weight,parseInt(goal!))
    return (            
        <div className="bg-darkLight mx-5 rounded-xl p-5 shadow-lg shadow-black mb-5 text-white">
                <div className="flex gap-4">


                    <div className="flex flex-col flex-1 gap-2">
                        <div>{progression[0].exercisename}</div>
                        <div className="text-gray-400">
                            {t("Current")}: {progression[0].set.weight} kg x {progression[0].set.repeat}
                        </div>

                        <div className="text-gray-400">
                            {t("Previous")}: {progression[1].set.weight} kg x {progression[1].set.repeat}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className={data.color}>
                            {data.icon === 'up' && '▲'}
                            {data.icon === 'down' && '▼'}
                            {data.percentage}  
                        </div>

                        <div className="flex flex-col text-right mt-auto">
                            <span className="text-xl">{goalProgressionPrecentage.toFixed(2)}%</span>
                            <span className="text-gray-400">{t("OfGoal")}</span>
                        </div>
                    </div>
                </div>

                {goal && <div className={`h-3 bg-gray-700/50 mt-4 rounded-full w-full`}>
                        <div className={`h-3 rounded-full ${data.bg}`} style={{width: `${goalProgressionPrecentage}%`}}></div>
                    </div>}
        </div>
        );
}

export default SingleProgression;
