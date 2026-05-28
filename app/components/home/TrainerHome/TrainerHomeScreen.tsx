import { getHomeScreenData } from "@/app/trainerActions";
import MyStudents from "./MyStudents";
import { Suspense } from "react";
import DaysWidget from "../DaysWidget";
import { HomeWidgetSeleton } from "../../Loading/home/HomeWidgetSeleton";
import PlanTrainings from "./PlanTrainings";
import { TrainerHomeContextProvidr } from "./TrainerHomeContext";
import { UserPurposeType } from "@/app/types";

async function TrainerHomeScreen({ purpose }: { purpose: UserPurposeType }) {

    const trainerData = await getHomeScreenData()

    if(trainerData.error) {
        return(
            <div className="flex flex-col items-center w-full overflow-x-hidden">
                <p className="text-red-500">{trainerData.error}</p>
            </div>
        )
    }
    return ( 
        <TrainerHomeContextProvidr ids={trainerData.allTraineesIDs} userid={trainerData.userid!} userPurpose={purpose}>
            <div className="flex flex-col items-center w-full overflow-x-hidden px-5">
                <Suspense fallback={<HomeWidgetSeleton />}>
                    <DaysWidget />
                </Suspense>

                <MyStudents trainings={trainerData.trainings} />

                {trainerData.traineesWithoutPlans.length > 0 && <PlanTrainings traineesWithoutPlans={trainerData.traineesWithoutPlans}/>}
            </div>
        </TrainerHomeContextProvidr>
     );
}

export default TrainerHomeScreen;