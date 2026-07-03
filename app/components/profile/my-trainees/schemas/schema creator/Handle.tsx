import { Select } from "@/app/components/ui/SelectField";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { nameTrimmer } from "@/app/lib/utils";
import { TrainerSingleExerciseSchema } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from "react";

type HandleProps = {
    planIndex: number;
    exerciseIndex: number;
    exercise: TrainerSingleExerciseSchema;
}

function Handle({ exercise, planIndex, exerciseIndex }: HandleProps) {
    const u = useTranslations("Utils")
    const h = useTranslations("Handles")

    const { handles, schema, setSchema, exercisesThatUseHandles, loading } = useContext(TrainingSchemaContext)!

    const selectedHandle = exercise.handle ? {id: exercise.handle.id, handlename: exercise.handle.handlename} : handles[0]

    const handleHandleChange = (obj:{id:string,handlename:string}) => {
        if(loading) return;
        let schemaCopy = structuredClone(schema)
        schemaCopy.plan[planIndex].exercises[exerciseIndex].handle = obj
        setSchema(schemaCopy)
    }

    return ( 
    <div className='flex gap-2 mt-2'>
        <div className='flex-1 flex flex-col text-lg relative'>
            <label htmlFor='handle' className='text-marmur font-light text-sm px-2 absolute -top-1/3 left-2 bg-darkLight'>{u("Handle")}</label>
            <select name="handle" id="side" className='bg-darkLight pl-3 text-marmur border-borderInteractive border-2 rounded-md h-10' value={JSON.stringify(selectedHandle)} onChange={e=>handleHandleChange(JSON.parse(e.target.value) as {id:string, handlename: string})} disabled={loading}>
                {handles.map(handle=>{
                    const name = handles.some(h => h.handlename === handle.handlename) ? h(nameTrimmer(handle.handlename)) : handle.handlename 
                    return <option value={JSON.stringify(handle)} key={handle.id}>{name}</option>
                })}
            </select>
        </div>
    </div>
     );
}

export default Handle;
