import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, getSchemaData } from "@/app/actions";
import SchemaEditor from "@/app/components/profile/my-trainees/schemas/schema creator/SchemaEditor";
import { TrainingSchemaContextProvider } from "@/app/context/TrainingSchemaContext";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {

    const schemaid = (await params).schemaid;

    const schema = await getSchemaData(schemaid);
    const hadnles = await getAllHandleTypes();
    const allExercises = await getAllExercises();
    const allExercisesInOneArray = await AllExercisesInOneArray()

    if(schema.error || !schema.schema) {
        return <div className="text-white">Nie można znaleźć tego schematu.</div>
    }

    return( 
    <TrainingSchemaContextProvider page='edit' handles={hadnles} schema={schema.schema} allExercises={allExercises} allExercisesInOneArray={allExercisesInOneArray}>
        <SchemaEditor />
    </TrainingSchemaContextProvider>)
}