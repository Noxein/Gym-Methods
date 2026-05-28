'use client'
import { Button } from "@/app/components/ui/Button";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function AddExercsieButton() {
    const { setShowExerciseModal, loading } = useContext(CreateTrainingContext)!

    const handleClick = () => {
        if(loading) return;
        setShowExerciseModal(true)
    }

    const t = useTranslations("Home/Profile/My-Trainees/Schemas/Create")
    return ( 
        <Button className="w-fullz-20" blue onClick={handleClick} disabled={loading}>{t("AddExercise")}</Button>
     );
}

export default AddExercsieButton;