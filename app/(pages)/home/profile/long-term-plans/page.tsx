import { getAllUserLongTermPlans } from "@/app/actions"
import LongTermPlans from "@/app/components/profile/long-term-plans/LongTermPlans"

export default async function page(){
    const AllUserLongTermPlans = await getAllUserLongTermPlans()

    return(
        <LongTermPlans AllUserLongTermPlans={AllUserLongTermPlans}/>
    )
}