'use client'
import { getTrainerSchemas } from "@/app/actions";
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { CenterComponent } from "@/app/components/CenterComponent";
import { Button } from "@/app/components/ui/Button";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { TraineePlan, TrainerPlanSchema } from "@/app/types";
import { addDays } from "date-fns";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { v4 } from "uuid";
import { date } from "zod";

function ImportPlan() {
    const[showImport,setShowImport] = useState(false)
    const[schemas,setSchemas] = useState<TrainerPlanSchema[]>([])
    const[loaded,setLoaded] = useState(false);

    const { loading, setPlan } = useContext(CreateTrainingContext)!

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    const u = useTranslations("Utils")

    const handleClickImport = async () => {
        setShowImport(true);
        if(!loaded){
            const result = await getTrainerSchemas()
            setSchemas(result.schemas)
            setLoaded(true)
        }
    }

    const handleImportSchema = (schema: TrainerPlanSchema) => {
        let schemaPlan:TraineePlan = {
            id: v4(),
            name: schema.name,
            plan: [
                ...schema.plan.map(plan => ({
                    id: v4(),
                    name: plan.name,
                    date: addDays(new Date(), 1),
                    exercises: [
                        ...plan.exercises.map(exercise => ({
                            id: v4(),
                            exerciseid: exercise.exerciseid,
                            exercisename: exercise.exercisename,
                            sets: [],
                            handle: exercise.handle ? exercise.handle : undefined,
                        }))
                    ],
                    iscompleted: false,
                }))
            ],
            iscompleted: false,
        } 
        console.log(schemaPlan)
        setPlan(schemaPlan);
        setShowImport(false);
    }

    return ( 
        <div>
            <div className="mb-6 mx-5 mt-5">
                <Button className="w-full" blue onClick={handleClickImport} disabled={loading}>{t("importTemplate")}</Button>
            </div>
            {showImport && (
                <BlurBackgroundModal onClick={() => setShowImport(false)} className="z-50">            
                        <div className="bg-darkLight p-5 rounded-lg w-96 text-white max-h-[80vh] overflow-auto" onClick={e=>e.stopPropagation()}>
                            {!loaded ? <p>{t("loadingTemplates")}</p> : schemas.length === 0 ? <p>{t("noTemplatesAvailable")}</p> : (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">{t("availableTemplates")}</h2>
                                    {schemas.map((schema, index) => (
                                        <div key={index} className="p-4 bg-dark rounded-lg flex items-center justify-between gap-4 flex-col mb-4">
                                            <p className="font-bold">{schema.name}</p>
                                            <Button className="w-full py-2" isPrimary blue onClick={() => handleImportSchema(schema)} disabled={loading}>{t("importThisTemplate")}</Button>
                                        </div>
                                    ))}

                                </div>
                            )}
                            <Button className="w-full mt-4" blue onClick={() => setShowImport(false)} disabled={loading}>{u("Close")}</Button>
                        </div>
                </BlurBackgroundModal>
            )}
        </div>
     );
}

export default ImportPlan;