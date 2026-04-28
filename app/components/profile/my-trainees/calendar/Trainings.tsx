'use client'

import { useContext, useState } from "react";
import AddTrainingBtn from "./AddTrainingBtn";
import TraineeCalendarContext from "@/app/context/TraineeCalendarContext";
import { isSameDay } from "date-fns";
import TrainingOverview from "./TrainingOverview";
import { useTranslations } from "next-intl";

type TrainingsProps = {
    selectedDate: Date,
}

function Trainings({ selectedDate }: TrainingsProps) {

    const[showAddTrainingModal, setShowAddTrainingModal] = useState(false);
    const { plans } = useContext(TraineeCalendarContext)!
    
    const trainingsForSelectedDate = plans.filter(training => {
        return training.plan.some(pln => isSameDay(pln.date, selectedDate))
    });

    const t = useTranslations("Home/Profile/My-Trainees/Calendar")

    return ( 
        <div className="bg-darkLight p-5 mx-5 mt-4 rounded-lg">
            <p className="text-white text-xl">{t("TrainingsForDate")} <span className="font-mono font-bold">{selectedDate.toLocaleDateString()}</span></p>
            {trainingsForSelectedDate.length === 0 ? (
                <p className="text-gray-400 mt-2">{t("NoTrainingsScheduled")}</p>
            ) : (
                trainingsForSelectedDate.map((training, index) => (
                    <TrainingOverview key={training.id} training={training} selectedDate={selectedDate}/>
                ))
            )}
            <AddTrainingBtn showAddTrainingModal={showAddTrainingModal} setShowAddTrainingModal={setShowAddTrainingModal} allTrainings={plans}/>
        </div>
     );
}

export default Trainings;