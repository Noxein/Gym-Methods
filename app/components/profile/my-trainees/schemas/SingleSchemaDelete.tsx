import { TrainerPlanSchema } from "@/app/types";

type SingleSchemaDeleteProps = {
    schema: TrainerPlanSchema;
    selectedSchemasIds: string[];
    setSelectedSchemasIds: React.Dispatch<React.SetStateAction<string[]>>
}

function SingleSchemaDelete({ schema, selectedSchemasIds, setSelectedSchemasIds }: SingleSchemaDeleteProps) {

    const handleSelect = (id: string) => {
        setSelectedSchemasIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((schemaId) => schemaId !== id);
            } else {
                return [...prev, id];
            }})
            console.log(selectedSchemasIds)
    }
    return ( 
        <div className="p-4 flex justify-between cursor-pointer bg-darkLight" onClick={() => handleSelect(schema.id)}>
            <div  className={` border-darkLight w-5 h-5 rounded-sm flex items-center justify-center ${selectedSchemasIds.includes(schema.id) ? "bg-blue-500" : "bg-dark"}`}>

            </div>
            <p className="flex-1 text-left pl-4">{schema.name}</p>
            <p className="text-gray-500">{schema.plan.length} plans</p>
        </div>
     );
}

export default SingleSchemaDelete;