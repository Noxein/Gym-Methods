'use client'
import { useTranslations } from "next-intl";

function ExerciseProgression() {
    const t = useTranslations("Home/TraineeHome")

    return (             
    <h2 className='text-center text-2xl text-marmur my-5'>
        {t('ExerciseProgression')}
    </h2> );
}

export default ExerciseProgression;