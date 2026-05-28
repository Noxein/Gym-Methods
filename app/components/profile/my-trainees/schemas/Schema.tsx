'use client'
import { TrainerPlanSchema } from "@/app/types";
import { useRouter } from "next/navigation";

type SchemaProps = {
    schema: TrainerPlanSchema
}

function Schema({schema}:SchemaProps) {

    const router = useRouter()


    return ( 
        <div key={schema.id} className="text-white" onClick={()=>{router.push('/home/profile/my-trainees/schemas/'+schema.id)}}>
            {schema.name}
        </div>
     );
}

export default Schema;