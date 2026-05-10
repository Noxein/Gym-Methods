import { getAllHandleTypes, userID } from "@/app/actions";
import TraineeTraining from "@/app/components/start-training/trainee/TraineeTraining";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";
import { TimerContextProvider } from "@/app/context/TimerContext";
import { TraineeTrainingContextProvider } from "@/app/context/TraineeTrainingContext";
import { TrainerJoinTrainingContextProvider } from "@/app/context/TrainerJoinTrainingContext";
import { getTraineeTrainingById } from "@/app/traineeActions";
import { getTraineeIdByTrainingId, JoinTraining } from "@/app/trainerActions";
import { auth } from "@/auth";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const trainingId = (await params).trainingId;
    const traineeID = await getTraineeIdByTrainingId(trainingId)
    const allHandles = await getAllHandleTypes()

    const user = await auth()

    if(traineeID.error || !traineeID.traineeId) return <div className="text-center mt-20 text-xl">Error fetching training data</div>

    return(
        <ConfirmModalProvider>
             <TimerContextProvider>
                <TrainerJoinTrainingContextProvider traineeId={traineeID.traineeId} userid={user?.user?.id!} userPurpose={user?.user?.purpose!} allHandles={allHandles}>
                    <TraineeTraining />
                </TrainerJoinTrainingContextProvider>
            </TimerContextProvider>
        </ConfirmModalProvider>
)
}