import TraineeInfo from "../calendar/TraineeInfo";
import Training from "./Training";
import ImportPlan from "./ImportPlan";
import TrainingModalsHolder from "./TrainingModalsHolder";
import Asymetry from "./Asymetry";
import ActionButtons from "./ActionButtons";

type CreateTrainingProps = {
    
}
function CreateTraining({  }: CreateTrainingProps) {
    return ( 
        <div>
            <TraineeInfo>
                <Asymetry />
            </TraineeInfo>

            <ImportPlan />

            <Training />

            <TrainingModalsHolder />

            <ActionButtons />
        </div>
     );
}

export default CreateTraining;