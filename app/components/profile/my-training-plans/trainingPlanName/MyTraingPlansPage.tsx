import { SpecificTrainingDontExist } from './SpecificTrainingDontExist'
import { ErrorTrainingQuery } from './ErrorTrainingQuery'
import { SpecificTraining } from './SpecificTraining'
import { AllExercisesInOneArray, getAllExercises, GetUserTrainingByName } from '@/app/actions'

type MyTraingPlansPageTypes = {
    trainingName:string
}
export const MyTraingPlansPage = async ({trainingName}:MyTraingPlansPageTypes) => {
    const training = await GetUserTrainingByName(trainingName)
    const isError = training?.error
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
  return (
    <div>
        {!training?<SpecificTrainingDontExist trainingName={trainingName}/>
        :isError?<ErrorTrainingQuery error={isError}/>
        :<SpecificTraining training={training.training!} exercises={exercises} allExercisesInOneArray={allExercisesInOneArray}/>}
    </div>
  )
}
