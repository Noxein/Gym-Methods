'use client'

import { useState } from "react";
import Calendar from "./Calendar";
import Trainings from "./Trainings";

function Schedule() {
    const[selectedDate, setSelectedDate] = useState(new Date());
    const[allTrainings, setAllTrainings] = useState([]); // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
    return ( 
        <>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <Trainings selectedDate={selectedDate} allTrainings={allTrainings}/>

        </>
     );
}

export default Schedule;