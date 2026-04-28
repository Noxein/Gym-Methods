import { getAllHandleTypes, userID } from "@/app/actions";
import TraineeTraining from "@/app/components/start-training/trainee/TraineeTraining";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TimerContextProvider } from "@/app/context/TimerContext";
import { TraineeTrainingContextProvider } from "@/app/context/TraineeTrainingContext";
import { getTraineeTrainingById } from "@/app/traineeActions";
import { auth } from "@/auth";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const trainingId = (await params).trainingId;
    const training = await getTraineeTrainingById(trainingId)
    const allHandles = await getAllHandleTypes()

    if(training.error) return <div className="text-white">Nie można znaleźć tego treningu</div>

    const user = await auth()

    return(
        <ConfirmModalProvider>
             <TimerContextProvider>
                <TraineeTrainingContextProvider training={training.response!} userid={user?.user?.id!} userPurpose={user?.user?.purpose!} allHandles={allHandles}>
                    <TraineeTraining />
                </TraineeTrainingContextProvider>
            </TimerContextProvider>
        </ConfirmModalProvider>
)
}