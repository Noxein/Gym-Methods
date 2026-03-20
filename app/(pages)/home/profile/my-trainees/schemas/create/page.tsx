import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, getSchemaData } from "@/app/actions";
import SchemaEditor from "@/app/components/profile/my-trainees/schemas/schema creator/SchemaEditor";
import { TrainingSchemaContextProvider } from "@/app/context/TrainingSchemaContext";
import { TrainerPlanSchema } from "@/app/types";
import { v4 } from "uuid";

export default async function page() {

    const schema:TrainerPlanSchema = {
        id: '',
        trainerid: '',
        name: '',
        plan: [
            {
                exercises: [],
                id: v4(),
                name: 'Plan 1',
            }
        ],
        lastedited: new Date()
    }
    const handles = await getAllHandleTypes();
    const allExercises = await getAllExercises();
    const allExercisesInOneArray = await AllExercisesInOneArray()

    return( 
    <TrainingSchemaContextProvider page='create' handles={handles} schema={schema} allExercises={allExercises} allExercisesInOneArray={allExercisesInOneArray}>
        <SchemaEditor />
    </TrainingSchemaContextProvider>)
}