import { Suspense } from "react";
import H2 from "../../ui/H2";
import { LatestTrainingSkeleton } from "../../Loading/home/start-training/LatestTrainingSkeleton";
import { LastTrainings } from "./LastTrainings";
import { BigTrainingStarter } from "@/app/types";

function LatestTrainingsWrapper({trainingList}:{trainingList: BigTrainingStarter[] | undefined}) {
    return ( 
        <div className='mt-auto mb-20'>
            <H2 text="Ostatnie Treningi" />

            <Suspense fallback={<LatestTrainingSkeleton />}>
                <LastTrainings trainingList={trainingList}/>
            </Suspense>
                
        </div>
     );
}

export default LatestTrainingsWrapper;