import { TrainerPlanSchema } from "@/app/types";
import Schema from "./Schema";

type SchemaMapProps = {
    schemas: TrainerPlanSchema[] // tutaj powinien być typ szablonu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function SchemasMap({schemas}:SchemaMapProps) {
    return ( 
        <div>
            {schemas.map((schema) => (
                <Schema key={schema.id} schema={schema} />
            ))}
        </div>
     );
}

export default SchemasMap;