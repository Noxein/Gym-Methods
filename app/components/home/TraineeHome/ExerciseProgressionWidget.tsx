import { GetProgressionsAndDeclines } from "@/app/actions";
import { ErrorDiv } from "../../ui/ErrorDiv";
import SingleProgression from "./SingleProgression";
import ExerciseProgression from "./ExerciseProgression";
import { getTranslations } from "next-intl/server";

async function ExerciseProgressionWidget() {
    const progressions = await GetProgressionsAndDeclines()
    const t = await getTranslations("Summary")

    const progrssionsArray = Object.keys(progressions.progressions)

    if(progressions.error) return <ErrorDiv error={progressions.error}/>
    
    return ( 
    <div className=" w-full">
        <ExerciseProgression />
        {progrssionsArray.length === 0
            ? <p className="text-white/50 text-sm text-center py-4">{t("NotEnoughtData")}</p>
            : progrssionsArray.map(key => (
                <SingleProgression key={key} progression={progressions.progressions[key]} goal={progressions.goals[key]}/>
            ))
        }

    </div> 
    );
}

export default ExerciseProgressionWidget;