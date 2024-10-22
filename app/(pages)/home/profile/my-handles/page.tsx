import { getUserHandles } from "@/app/actions";
import { MyHandles } from "@/app/components/profile/my-handles/MyHandles";

export default async function page(){
    const handles = await getUserHandles()
    //const handles = [{id:'1',handlename:'nameofHandle'},{id:'2',handlename:'otherhandle'}]
    return(
        <MyHandles handles={handles}/>
    )
}