import { FirstSetupFirstStep } from "@/app/types";
import { CenterComponent } from "@/app/components/CenterComponent";
import Navigator from "@/app/components/first-setup/Navigator";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { handleSaveTrainerSetup } from "@/app/actions";
import { useState } from "react";
import { useTranslations } from "next-intl";

type TrainerProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>
}
function Trainer({setCurrentStep}: TrainerProps) {
    const t = useTranslations("FirstSetup")
    const u = useTranslations("Utils")

    const[loading,setLoading] = useState(false)

    const handleBack = () => {
        setCurrentStep('purpose');
    }

    const handleFinish = async() => {
        // Finalize setup for trainer
        setLoading(true)
        await handleSaveTrainerSetup();
    }

    const handleGoHome = async() => {
        setLoading(true)
        await handleFinish();
        navigator.push('/home');
    }

    const handleGoAddTrainee = async() => {
        setLoading(true)
        await handleFinish();
        navigator.push('/home/profile/my-trainees?shouldOpen=true');
    }
    const navigator = useRouter()
    return ( 
        <CenterComponent>
            <div className="text-white w-full px-5 flex flex-col gap-6">
                <h1 className="text-3xl font-medium mb-10 text-center">{t("WhatNext")}</h1>

                <div className="flex gap-4">
                    <Button onClick={handleGoAddTrainee} disabled={loading} className="flex-1" isPrimary>{t("AddTrainee")}</Button>
                    <Button onClick={handleGoHome} disabled={loading} className="flex-1" isPrimary>{u("Homepage")}</Button>
                </div>

            </div>

            <Navigator 
                next={()=>{}}
                prev={handleBack}
                hideNext
                loading={loading}
            />
        </CenterComponent>
     );
}

export default Trainer;
