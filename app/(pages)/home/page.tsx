import { Home } from "@/app/components/home/Home";

export default async function page(){

    return(
        <div className="flex flex-col items-center w-full">
            <Home />
        </div>
    )
}