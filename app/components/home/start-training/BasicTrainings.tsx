'use client'
import { UserTrainingPlan } from "@/app/types";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon";
import { Icon } from "../../Icon";
import { StartWorkoutIcon } from "@/app/ui/icons/ExpandIcon";
import H2 from "../../ui/H2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type BasicTrainingsProps = {
    basicPlans: UserTrainingPlan[]
}

function BasicTrainings({ basicPlans }: BasicTrainingsProps) {
    const t = useTranslations("Home/Start-Training")

    const navigator = useRouter()

    const navigateToTraining = (trainingName: string) => {
        const encodedTrainingName = encodeURIComponent(trainingName);
        navigator.push(`/home/start-training/basic/${encodedTrainingName}`);
    }
    return ( 
    <div>
        <H2 text={t("BasicTrainings")} />

        <div className="bg-darkLight mx-5 shadow-sm shadow-black rounded-lg p-5 mb-10">
            {basicPlans.length === 0 ? (
                <p className="text-center">{t("NoBasicTrainings")}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {basicPlans.map((plan) => (
                        <ButtonWithIcon key={plan.id} buttonText={plan.trainingname} 
                            childrenIcon={<Icon>
                                <StartWorkoutIcon fill="#fff" />
                            </Icon>}
                            className="flex items-center"
                            isPrimary
                            onClick={() => navigateToTraining(plan.trainingname)}
                        />
                    ))}
                </div>
            )}
        </div> 
    </div>
);
}

export default BasicTrainings;
