import { getUserHandles } from "@/app/actions";
import { MyHandles } from "@/app/components/profile/my-handles/MyHandles";

export default async function page(){
    const handles = await getUserHandles()
    return(
        <MyHandles handles={handles}/>
    )
}