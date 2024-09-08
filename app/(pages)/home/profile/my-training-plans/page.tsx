import { GetUserTrainings } from "@/app/actions"
import { MyTrainingPlans } from "@/app/components/profile/my-training-plans/MyTrainingPlans"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Moje treningi",
};

export default async function page({searchParams}:{searchParams:{showAddModal:string}}){
        const UserTrainings = await GetUserTrainings()
        const showModal = !!(searchParams && searchParams.showAddModal || false)
    return (
        <MyTrainingPlans UserTrainings={UserTrainings} showAddModalUrl={showModal}/>
    )
}