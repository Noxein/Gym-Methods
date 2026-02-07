import { Suspense } from "react";
import { AddTrainingLink } from "./AddTrainingLink";
import { TrainingList } from "./TrainingList";
import { TrainingListSkeleton } from "../../Loading/home/start-training/TrainingListSkeleton";
import { LatestTrainingSkeleton } from "../../Loading/home/start-training/LatestTrainingSkeleton";
import { LastTrainings } from "./LastTrainings";
import { BigTrainingData, BigTrainingStarter } from "@/app/types";
import H2 from "../../ui/H2";

type AdvancedTrainingsProps = {
    LongTermTrainingList: BigTrainingData[],
    trainingList: BigTrainingStarter[] | undefined
}
function AdvancedTrainings({LongTermTrainingList, trainingList}: AdvancedTrainingsProps) {
    return (
    <div>

        <H2 text="Treningi Zaawansowane" />
        <div className="bg-darkLight mx-5 shadow-sm shadow-black rounded-lg p-5 mb-10">
            <AddTrainingLink  LongTermTrainingList={LongTermTrainingList}/>

            <Suspense fallback={<TrainingListSkeleton />}>
                <TrainingList trainingList={trainingList}/>
            </Suspense>
        </div>
    </div> );
}

export default AdvancedTrainings;