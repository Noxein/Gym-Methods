'use client'
import { Button } from "@/app/components/ui/Button";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { TrainerSingleTrainingSchema } from "@/app/types";
import { useTranslations } from "next-intl";
import { useContext } from 'react';
import { v4 } from "uuid";

function AddPlanButton() {

    const { schema, setSchema, loading } = useContext(TrainingSchemaContext)!

    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')

    const handleAddPlan = () => {
        const newPlan:TrainerSingleTrainingSchema = {
            id: v4(),
            name: t('NewPlan'),
            exercises: []
        }
        setSchema((prevSchema) => ({
            ...prevSchema,
            plan: [...prevSchema.plan, newPlan],
        }));
    }

    return ( 
    <Button onClick={handleAddPlan} blue loading={loading}>{t('AddPlan')}</Button>
 );
}

export default AddPlanButton;
