import { SelectTraining } from "@/app/components/home/start-training/SelectTraining"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rozpocznij trening",
};

export default async function page(){
    
    return(
        <main className="text-white">
            <SelectTraining />
        </main>
    )
}