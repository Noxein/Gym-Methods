import { Button } from "@/app/components/ui/Button";
import { TrainerPlanSchema } from "@/app/types";
import AddNewSchemaButton from "./AddNewSchemaButton";
import SchemaList from "./SchemaList";
import DeleteSchemasButton from "./DeleteSchemasButton";
import SchemasNotFound from "./SchemasNotFound";

type SchemasProps = {
    schemas: TrainerPlanSchema[]
}

function Schemas({ schemas }: SchemasProps) {

    
    if(schemas.length === 0) {
        return(
            <div className="text-white mx-5 mt-5 flex justify-center flex-col gap-4 text-center">
                <AddNewSchemaButton />

                <SchemasNotFound/>
            </div>
        )
    }
    return ( 
        <div className="text-white mx-5 mt-5 flex justify-center flex-col gap-4 text-center">
            <AddNewSchemaButton />

            <SchemaList schemas={schemas} />

            
        </div>
     );
}

export default Schemas;