import { FirstSetupFirstStep } from "@/app/types";
import CasualUserSetup from "@/app/components/first-setup/Casual/CasualUserSetup";
import Trainee from "@/app/components/first-setup/Trainee/Trainee";
import Trainer from "@/app/components/first-setup/Trainer/Trainer";

type SecondStepProps = {
    purpose: string,
    selectPurpose: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
    jwt?: string
}
function SecondStep({purpose,selectPurpose,jwt}: SecondStepProps) {
    return ( 
        purpose==='Casual'?<CasualUserSetup selectPurpose={selectPurpose} />:
        purpose==='Trener'?<Trainer setCurrentStep={selectPurpose}/>:
        <Trainee setCurrentStep={selectPurpose} jwt={jwt}/>

     );
}

export default SecondStep;