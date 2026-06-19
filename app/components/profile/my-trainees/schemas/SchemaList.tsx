'use client'
import { TrainerPlanSchema } from "@/app/types";
import SingleSchema from "./SingleSchema";
import DeleteSchemasButton from "./DeleteSchemasButton";
import { useState } from "react";
import SingleSchemaDelete from "./SingleSchemaDelete";
import DeleteSchemaOptions from "./DeleteSchemaOptions";

type SchemaListProps = {
    schemas: TrainerPlanSchema[]
}

function SchemaList({ schemas }: SchemaListProps) {

    const[showDelete,setShowDelete] = useState(false)
    const[selectedSchemasIds, setSelectedSchemasIds] = useState<string[]>([])
    
    return ( 
        <div className="rounded-lg min-h-dvh flex flex-col gap-4">
            <>
                {!showDelete && schemas.map((schema) => (
                    <div key={schema.id} className="text-white bg-darkLight rounded-lg">
                        <SingleSchema schema={schema} />
                    </div>
                ))}
            </>
            <>
                {showDelete && schemas.map((schema) => (
                    <SingleSchemaDelete key={schema.id} schema={schema} selectedSchemasIds={selectedSchemasIds} setSelectedSchemasIds={setSelectedSchemasIds}/>
                ))}
            </>

            {!showDelete && <DeleteSchemasButton setShowDelete={setShowDelete}/>}

            {showDelete && <DeleteSchemaOptions setShowDelete={setShowDelete} selectedSchemasIds={selectedSchemasIds}/>}
        </div>
     );
}

export default SchemaList;