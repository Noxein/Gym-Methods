import { getHomeScreenData } from "@/app/trainerActions";

function TrainerHomeScreen() {

    const trainerData = getHomeScreenData()
    return ( 
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            Trainer Home
        </div>
     );
}

export default TrainerHomeScreen;