import { FirstSetupFirstStep } from "@/app/types";
import { CenterComponent } from "@/app/components/CenterComponent";
import Navigator from "@/app/components/first-setup/Navigator";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { handleSaveTrainerSetup } from "@/app/actions";

type TrainerProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>
}
function Trainer({setCurrentStep}: TrainerProps) {



    const handleBack = () => {
        setCurrentStep('purpose');
    }

    const handleFinish = async() => {
        // Finalize setup for trainer
        await handleSaveTrainerSetup();
    }

    const handleGoHome = async() => {
        await handleFinish();
        navigator.push('/home');
    }

    const handleGoAddTrainee = async() => {
        await handleFinish();
        navigator.push('/home/my-trainees/add-trainee');
    }
    const navigator = useRouter()
    return ( 
        <CenterComponent>
            <div className="text-white w-full px-5 flex flex-col gap-6">
                <h1 className="text-3xl font-medium mb-10 text-center">Co dalej</h1>

                <div className="flex gap-4">
                    <Button onClick={handleGoAddTrainee} className="flex-1" isPrimary>Dodaj podopiecznego</Button>
                    <Button onClick={handleGoHome} className="flex-1" isPrimary>Strona główna</Button>
                </div>

            </div>

            <Navigator 
                next={()=>{}}
                prev={handleBack}
                hideNext
            />
        </CenterComponent>
     );
}

export default Trainer;