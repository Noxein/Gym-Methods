import { GetProgressionsAndDeclines } from "@/app/actions";
import { ErrorDiv } from "../../ui/ErrorDiv";
import SingleProgression from "./SingleProgression";

async function ExerciseProgressionWidget() {
    const progressions = await GetProgressionsAndDeclines()

    const progrssionsArray = Object.keys(progressions.progressions)

    if(progressions.error) return <ErrorDiv error={progressions.error}/>
    
    return ( 
    <div className=" w-full">
        {progrssionsArray.map(key => (
            <SingleProgression key={key} progression={progressions.progressions[key]} goal={progressions.goals[key]}/>
        ))}

    </div> 
    );
}

export default ExerciseProgressionWidget;