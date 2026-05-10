'use client';
import { Trainee } from "@/app/types";
import AddTrainee from "./AddTrainee";
import TraineesList from "./TraineesList";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useTranslations } from "next-intl";

type MyTraineesProps = {
    trainees: Trainee[]
}

function MyTrainees({ trainees }: MyTraineesProps) {
    const t = useTranslations("Home/Profile")

    const[searchTerm, setSearchTerm] = useState("");

    const filteredTrainees = trainees.filter((trainee) =>
        trainee.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( 
        <main className="mx-5 mt-20 flex justify-center flex-col text-white gap-4 text-center">
            <p className="text-3xl">{t("MyTrainees")}</p>
            <AddTrainee />

            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <TraineesList trainees={filteredTrainees}/>

        </main> );
}

export default MyTrainees;
