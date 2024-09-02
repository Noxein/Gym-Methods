import { GetUserTrainings } from "@/app/actions"
import { MyTrainingPlans } from "@/app/components/profile/my-training-plans/MyTrainingPlans"

export default async function page({searchParams}:{searchParams:{showAddModal:string}}){
        const UserTrainings = await GetUserTrainings()
        const showModal = !!(searchParams && searchParams.showAddModal || false)
    return (
        <MyTrainingPlans UserTrainings={UserTrainings} showAddModalUrl={showModal}/>
    )
}