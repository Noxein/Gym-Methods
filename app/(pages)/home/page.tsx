import { NavButton } from "@/app/components/home/NavButton";

export default function Home(){
    return(
        <div className="flex flex-col items-center w-screen">
            <NavButton text="Dodaj ćwiczenie" href="/home/add-exercise"/>
        </div>
    )
}