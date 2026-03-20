'use client'
import { TrainerPlanSchema } from "@/app/types";
import { useRouter } from "next/navigation";

type Props = {
    schema: TrainerPlanSchema;
}

function SingleSchema({ schema }: Props) {
    const router = useRouter();
    return ( 
        <div className="p-4 flex justify-between cursor-pointer" onClick={()=>router.push('/home/profile/my-trainees/schemas/' + schema.id)}>
            <p>{schema.name}</p>
            <p className="text-gray-500">{schema.plan.length} plans</p>
        </div>
     );
}

export default SingleSchema;