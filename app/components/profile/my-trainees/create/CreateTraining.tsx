import TraineeInfo from "../calendar/TraineeInfo";
import Training from "./Training";
import ImportPlan from "./ImportPlan";
import TrainingModalsHolder from "./TrainingModalsHolder";
import Asymetry from "./Asymetry";
import ActionButtons from "./ActionButtons";
import Settings from "./Settings";

type CreateTrainingProps = {
    
}
function CreateTraining({  }: CreateTrainingProps) {
    return ( 
        <div>
            <div className="flex bg-darkLight rounded-lg mx-5 mt-5 p-5">
                <TraineeInfo className="flex-1"/>
                <Settings />
            </div>

            <Training />

            <TrainingModalsHolder />

            <ActionButtons />
        </div>
     );
}

export default CreateTraining;