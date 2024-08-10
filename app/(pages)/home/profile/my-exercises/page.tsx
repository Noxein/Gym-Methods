import { getUserExercises } from "@/app/actions";
import { MyExercises } from "@/app/components/profile/my-exercises/MyExercises";

export default async function page(){
    const exercises = await getUserExercises()
    //const exercises = [{exercicename:'Moje ćwiczenie 1',id:'1',userid:'33'},{exercicename:'Moje ćwiczenie 2',id:'2',userid:'33'},{exercicename:'Moje ćwiczenie 3',id:'3',userid:'33'}]
    return(
        <div>
            <MyExercises exercises={exercises}/>
        </div>
    )
}