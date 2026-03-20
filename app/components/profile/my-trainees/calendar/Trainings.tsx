'use client'

import { useState } from "react";
import AddTrainingBtn from "./AddTrainingBtn";

type TrainingsProps = {
    selectedDate: Date,
    allTrainings: any[] // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function Trainings({ selectedDate, allTrainings }: TrainingsProps) {

    const[showAddTrainingModal, setShowAddTrainingModal] = useState(false);
    
    const trainingsForSelectedDate = allTrainings.filter(training => {
        const trainingDate = new Date(training.date);
        return trainingDate.toDateString() === selectedDate.toDateString();
    });

    return ( 
        <div className="bg-darkLight p-5 mx-5 mt-4 rounded-lg">
            <p className="text-white text-xl">Treningi z dnia <span className="font-mono font-bold">{selectedDate.toLocaleDateString()}</span></p>
            {trainingsForSelectedDate.length === 0 ? (
                <p className="text-gray-400 mt-2">Brak treningów zaplanowanych na ten dzień.</p>
            ) : (
                trainingsForSelectedDate.map((training, index) => (
                    <div key={index} className="text-white mt-2">
                        {training.name} - {new Date(training.date).toLocaleTimeString()}
                    </div>
                ))
            )}
            <AddTrainingBtn showAddTrainingModal={showAddTrainingModal} setShowAddTrainingModal={setShowAddTrainingModal} allTrainings={allTrainings}/>
        </div>
     );
}

export default Trainings;