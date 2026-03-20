import { getTrainees } from "@/app/actions";
import MyTrainees from "@/app/components/profile/my-trainees/MyTrainees";

export default async function page() {

    const trainees = await getTrainees()
    return <MyTrainees trainees={trainees} />
}