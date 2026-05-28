'use client'

import { useState } from "react";
import Calendar from "./Calendar";
import Trainings from "./Trainings";
import ActionButtons from "@/app/components/ui/ActionButtons";
import Actions from "./Actions";

function Schedule() {
    const[selectedDate, setSelectedDate] = useState(new Date());
    return ( 
        <>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <Trainings selectedDate={selectedDate}/>

            <Actions />

        </>
     );
}

export default Schedule;