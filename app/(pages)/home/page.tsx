import { Home } from "@/app/components/home/Home";
import { Metadata } from "next";

  
export default async function page(){

    return(
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            <Home />
        </div>
    )
}