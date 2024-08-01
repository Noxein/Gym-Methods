import { NavButton } from "@/app/components/home/NavButton";
import { auth } from "@/auth";

export default async function Home(){
    const user = await auth()
    console.log('USER:',user)
    return(
        <div className="flex flex-col items-center w-screen">
            <NavButton text="Dodaj ćwiczenie" href="/home/add-exercise"/>
        </div>
    )
}