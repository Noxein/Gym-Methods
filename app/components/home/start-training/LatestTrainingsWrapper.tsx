import { Suspense } from "react";
import H2 from "../../ui/H2";
import { LatestTrainingSkeleton } from "../../Loading/home/start-training/LatestTrainingSkeleton";
import { LastTrainings } from "./LastTrainings";
import { BigTrainingStarter } from "@/app/types";
import { useTranslations } from "next-intl";

function LatestTrainingsWrapper({trainingList}:{trainingList: BigTrainingStarter[] | undefined}) {
    const t = useTranslations("Home/Start-Training")
    return ( 
        <div className='mt-auto mb-20'>
            <H2 text={t("LatestTrainings")} />

            <Suspense fallback={<LatestTrainingSkeleton />}>
                <LastTrainings trainingList={trainingList}/>
            </Suspense>
                
        </div>
     );
}

export default LatestTrainingsWrapper;
