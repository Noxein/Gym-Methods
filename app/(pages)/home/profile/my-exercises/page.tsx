import { getUserExercises } from "@/app/actions";
import { MyExercises } from "@/app/components/profile/my-exercises/MyExercises";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Moje ćwiczenia",
};

export default async function page({searchParams}:{searchParams:{showAddModal: string}}){
    const exercises = await getUserExercises()
    const showModal = !!(searchParams && searchParams.showAddModal || false)
    return(
        <MyExercises exercises={exercises} showAddModal={showModal}/>
    )
} 