import { getTrainerSchemas } from "@/app/actions";
import SchemaError from "@/app/components/profile/my-trainees/schemas/SchemaError";
import Schemas from "@/app/components/profile/my-trainees/schemas/Schemas";
import { ConfirmModalProvider } from "@/app/context/ConfirmModalContext";

export default async function page() {

    const result = await getTrainerSchemas()

    if(result.error) {
        return(
            <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center text-center text-red-500">
                <SchemaError error={result.error}/>
            </div>
        )
    }
    return(
        <ConfirmModalProvider>
            <Schemas schemas={result.schemas} />
        </ConfirmModalProvider>
    )
}