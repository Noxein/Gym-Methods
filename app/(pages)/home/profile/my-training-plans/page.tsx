import { GetUserTrainings } from "@/app/actions"
import { MyTrainingPlans } from "@/app/components/profile/my-training-plans/MyTrainingPlans"

export default async function page(){
        const UserTrainings = await GetUserTrainings()
    return (
        <MyTrainingPlans UserTrainings={UserTrainings}/>
    )
}