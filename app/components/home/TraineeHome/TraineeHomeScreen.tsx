import { Suspense } from "react";
import { HomeWidgetSeleton } from "../../Loading/home/HomeWidgetSeleton";
import DaysWidget from "../DaysWidget";
import WelcomeWidget from "./WelcomeWidget";
import TrainingWidget from "./TrainingWidget";
import { getTraineeTrainings } from "@/app/traineeActions";
import ExerciseProgressionWidget from "./ExerciseProgressionWidget";

type TraineeHomeScreenTypes = {
    name:string
}

async function TraineeHomeScreen({name}:TraineeHomeScreenTypes) {

    const traineeTrainings = await getTraineeTrainings()
    
    return ( 
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            <Suspense fallback={<HomeWidgetSeleton />}>
                <DaysWidget />
            </Suspense>

            <WelcomeWidget name={name} />

            <TrainingWidget traineeTrainings={traineeTrainings} />

            <ExerciseProgressionWidget />
        </div>
     );
}

export default TraineeHomeScreen;