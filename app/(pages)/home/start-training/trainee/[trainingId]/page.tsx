import { getAllHandleTypes, userID } from "@/app/actions";
import TraineeTraining from "@/app/components/start-training/trainee/TraineeTraining";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TimerContextProvider } from "@/app/context/TimerContext";
import { TraineeTrainingContextProvider } from "@/app/context/TraineeTrainingContext";
import { getTraineeTrainingById } from "@/app/traineeActions";
import { getTraineeIdByTrainingId } from "@/app/trainerActions";
import { TraineePlan } from "@/app/types";
import { auth } from "@/auth";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const user = await auth()

    const trainingId = (await params).trainingId;
    const traineeId = user?.user.purpose === 'Podopieczny trenera' ? user.user.id : (await getTraineeIdByTrainingId(trainingId)).traineeId;
    const training = await getTraineeTrainingById(trainingId)

    const allHandles = await getAllHandleTypes()

    if(training?.error) return <div className="text-white">Nie można znaleźć tego treningu1</div>

    if(!training.response) return <div className="text-white">Nie można znaleźć tego treningu2</div>

    if(!traineeId) return <div className="text-white">Nie można znaleźć tego treningu3</div>

    return(
        <ConfirmModalProvider>
             <TimerContextProvider>
                <TraineeTrainingContextProvider  training={training?.response} userid={user?.user?.id!} userPurpose={user?.user?.purpose!} allHandles={allHandles} traineeId={traineeId}>
                    <TraineeTraining />
                </TraineeTrainingContextProvider>
            </TimerContextProvider>
        </ConfirmModalProvider>
)
}