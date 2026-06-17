import { AllExercisesInOneArray, getAllExercises, getSchemaData } from "@/app/actions";
import { getTrainerAllHandleTypes } from "@/app/trainerActions";
import SchemaEditor from "@/app/components/profile/my-trainees/schemas/schema creator/SchemaEditor";
import { TrainingSchemaContextProvider } from "@/app/context/TrainingSchemaContext";
import { getTranslations } from "next-intl/server";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")

    const schemaid = (await params).schemaid;

    const schema = await getSchemaData(schemaid);
    const hadnles = await getTrainerAllHandleTypes();
    const allExercises = await getAllExercises();
    const allExercisesInOneArray = await AllExercisesInOneArray()

    if(schema.error || !schema.schema) {
        return <div className="text-white">{t("Schema not found")}</div>
    }

    return( 
    <TrainingSchemaContextProvider page='edit' handles={hadnles} schema={schema.schema} allExercises={allExercises} allExercisesInOneArray={allExercisesInOneArray}>
        <SchemaEditor />
    </TrainingSchemaContextProvider>)
}
