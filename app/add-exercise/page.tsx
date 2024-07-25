import { AddExercise } from "../components/AddExercise";
import { CenterComponent } from "../components/CenterComponent";
import { FormWrapper } from "../components/FormWrapper";
import { auth } from '@/auth'

export default async function AddExercisePage(){
    const session = await auth()
    return(
        <CenterComponent>
            <AddExercise/>
            {JSON.stringify(session)}
        </CenterComponent>
    )
}