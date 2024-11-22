import { userEmail } from "@/app/actions";
import { Home } from "@/app/components/home/Home";

  
export default async function page(){
    const useremail = await userEmail()
    return(
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            <Home useremail={useremail}/>
        </div>
    )
} 