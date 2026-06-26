import { TraineesWithoutPlans } from "@/app/types";
import StudentWithoutPlan from "./StudentWithoutPlan";
import { useTranslations } from "next-intl";

type Props = {
    traineesWithoutPlans: TraineesWithoutPlans[]  
};
function PlanTrainings({ traineesWithoutPlans }: Props) {
    const t = useTranslations("Home/TrainerHome")

    return ( 
        <div className="   mt-10 px-5 w-full max-w-mobile text-white">
            <div className="bg-darkLight p-4 rounded-lg">
            <div className="flex justify-between">
                <h2 className="text-2xl mb-4">{t("PlanTraining")}</h2>

                <p>{traineesWithoutPlans.length}</p>

            </div>

            <div className="w-full bg-borderInteractive h-1"></div>

            <div className="mt-4">
                {traineesWithoutPlans.map(trainee => (
                    <StudentWithoutPlan key={trainee.username} trainee={trainee}/>
                ))}
            </div>
            </div>
        </div>
     );
}

export default PlanTrainings;
