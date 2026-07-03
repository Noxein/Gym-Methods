'use client'
import { Input } from "@/app/components/ui/Input";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { TrainerPlanSchema } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from "react";

type BasicDataProps = {

}

function BasicData({}: BasicDataProps) {

    const u = useTranslations('Utils')

    const { schema, setSchema, loading } = useContext(TrainingSchemaContext)!
    return ( 
        <div className="bg-darkLight rounded-lg mx-5 p-5">
            <Input labelName={u("Name")} value={schema.name} onChange={(e) => setSchema({ ...schema, name: e.target.value })} disabled={loading}/>
        </div>
     );
}

export default BasicData;
