import TraineeTrainingContext from "@/app/context/TraineeTrainingContext";
import { useContext } from "react";

function TrainingName() {
    const context = useContext(TraineeTrainingContext);

    if (!context) return null;

    return ( 
        <div className="text-white text-2xl font-bold">
            {context.training.name}
        </div>
     );
}

export default TrainingName;