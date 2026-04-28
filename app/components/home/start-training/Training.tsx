//import { DisplayTraining } from './DisplayTraining'
import { getAllHandleTypes } from '@/app/actions'
import { BigTrainingStarter, Progression } from '@/app/types'
import { TimerContextProvider } from '@/app/context/TimerContext'
import { LongPlanContextProvider } from '@/app/context/LongPlanContext'
import DisplayLongTermTraining from './DisplayLongTermTraining'

type TrainingTypes = {
    trainingPlanData: BigTrainingStarter,
}
export const Training = async ({trainingPlanData}:TrainingTypes) => {
    const allHandles = await getAllHandleTypes()
    return(
        <main>
            <LongPlanContextProvider trainingPlanData={trainingPlanData}>
                <TimerContextProvider>
                        <DisplayLongTermTraining 
                            allHandles={allHandles}
                        />
                    </TimerContextProvider>
            </LongPlanContextProvider>
        </main>
    )
}
