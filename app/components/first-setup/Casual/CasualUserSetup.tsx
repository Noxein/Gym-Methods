import { useState } from "react";
import { dataType, Goal } from "./Goal";
import { TrainingCreator } from "./TrainingCreator";
import { ExercisesSelector } from "./ExercisesSelector";
import { FirstSetupFirstStep, FirstSetupSelectedSteps } from "@/app/types";

type CasualUserSetupProps = {
    selectPurpose: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
}
function CasualUserSetup({selectPurpose}:CasualUserSetupProps) {
        const[data,setData] = useState<dataType>({goal:'Siła',advancmentlevel:'Początkujący',daysexercising:'2'})
        const[exercisesToDelete,setExercisesToDelete] = useState<string[]>([])
        const[favouriteExercises,setFavouriteExercises] = useState<string[]>([])
        const[currentStep,setCurrentStep] = useState<FirstSetupSelectedSteps>('goal')
    return ( 
        currentStep==='goal'?<Goal setCurrentStep={setCurrentStep} data={data} setData={setData} selectPurpose={selectPurpose} />:
        currentStep==='training-creator'?<TrainingCreator setCurrentStep={setCurrentStep} exercisesToDelete={exercisesToDelete} setExercisesToDelete={setExercisesToDelete} favouriteExercises={favouriteExercises} data={data}/>:
        currentStep==='fav-exercises'?<ExercisesSelector setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setExercises={setFavouriteExercises} exercisesToDelete={exercisesToDelete} data={data} isFav/>:
        currentStep==='not-fav-exercises'?<ExercisesSelector setCurrentStep={setCurrentStep} favouriteExercises={favouriteExercises} setExercises={setExercisesToDelete} exercisesToDelete={exercisesToDelete} data={data}/>:<></>
     );
}

export default CasualUserSetup;