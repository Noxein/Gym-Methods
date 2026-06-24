'use client'
import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { Button } from "../../ui/Button";
import { Icon } from "../../Icon";
import { useTranslations } from "next-intl";

type TrainingNavigationTypes = {
    previousExercise: () => void,
    nextExercise: () => void,
    handleCloseTraining: () => void,
    currentExerciseIndex: number,
    totalExercises: number,
}

function TrainingNavigation({previousExercise, nextExercise, handleCloseTraining, currentExerciseIndex, totalExercises}: TrainingNavigationTypes) {
    const t = useTranslations("Home/Start-Training/[TrainingName]")
    return (         
    <div className="flex gap-2 fixed bottom-20 w-full pr-10 max-w-mobile">
        <div className="flex gap-2 w-full">
            <Button className={`${currentExerciseIndex===0 ? 'border-gray-700':null} w-16 h-16`} onClick={previousExercise}>
                <Icon>
                    <LeftAngle fill={currentExerciseIndex===0 ? '#777':'#fff'} height='40' width='40'/>
                </Icon>
            </Button>

            <Button isPrimary className="flex-1 h-16" onClick={handleCloseTraining}>{t("CloseTraining")}</Button>

            <Button className={`${currentExerciseIndex===totalExercises - 1 ? 'border-gray-700':null} w-16 h-16` } onClick={nextExercise}>
                <Icon>
                    <LeftAngle className='rotate-180' fill={currentExerciseIndex===totalExercises - 1 ? '#777':'#fff'} height='40' width='40'/>
                </Icon>
            </Button> 
            </div>
        </div> );
}

export default TrainingNavigation;
