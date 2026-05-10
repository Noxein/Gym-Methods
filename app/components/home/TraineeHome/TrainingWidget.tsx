import { TraineePlan } from "@/app/types";
import TraineeTrainings from "./TraineeTrainings";
import { useTranslations } from "next-intl";

type TrainingWidgetProps = {
    traineeTrainings: TraineePlan[]
}

function TrainingWidget({traineeTrainings}:TrainingWidgetProps) {
    const t = useTranslations("Home/TraineeHome")
    return ( 
        <div className="text-white w-screen">
            <div className="bg-darkLight mx-5 rounded-xl p-5 mt-5 mb-5 shadow-black shadow-lg">
                <div className="border-b-1 pb-4 border-borderInteractive text-xl">{t("TodayTraining")}</div>

                <div className="pt-5">
                    <TraineeTrainings traineeTrainings={traineeTrainings}/>
                </div>
            </div>
        </div>
     );
}

export default TrainingWidget;
