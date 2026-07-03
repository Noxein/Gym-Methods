import { Button } from "@/app/components/ui/Button";
import TrainingSchemaContext from "@/app/context/TrainingSchemaContext";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function AddExerciseButton({ planIndex }: { planIndex: number }) {

    const { setShowExerciseModal, loading } = useContext(TrainingSchemaContext)!
    const handleShowExerciseSelect = () => {
        setShowExerciseModal(true);
        HideShowHTMLScrollbar('hide');
    }
    
    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')
    return ( 
        <Button onClick={handleShowExerciseSelect} blue loading={loading}>{t('AddExercise')}</Button>
     );    
}
export default AddExerciseButton;
