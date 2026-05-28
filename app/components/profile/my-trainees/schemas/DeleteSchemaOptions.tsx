import { Button } from "@/app/components/ui/Button";
import ConfirmModalContext from "@/app/context/ConfirmModalContext";
import { deleteSchemas } from "@/app/trainerActions";
import { useContext } from "react";
import { useTranslations } from "next-intl";

type DeleteSchemaOptionsProps = {
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
    selectedSchemasIds: string[];
}
function DeleteSchemaOptions({ setShowDelete, selectedSchemasIds }: DeleteSchemaOptionsProps) {
    const u = useTranslations("Utils")
    const t = useTranslations("Home/Profile/My-Trainees/Schemas")

    const { modalState, setModalState } = useContext(ConfirmModalContext)!
    const handleOpenModal = () => {
        setModalState({
            isOpen: true,
            message: t("DeleteSelectedSchemasConfirm"),
            onConfirm: () => handleDelete(),
            onDecline: () => setModalState({ ...modalState, isOpen: false })
        })
    }
    const handleDelete = async () => {
        // tutaj logika usuwania szablonów na podstawie selectedSchemasIds
        if(selectedSchemasIds.length === 0) {
            setShowDelete(false);
            return;
        }
        setShowDelete(false);
        const result = await deleteSchemas(selectedSchemasIds);

        if(result.error) {
            setModalState({
                isOpen: true,
                message: result.error,
                onConfirm: () => setModalState({ ...modalState, isOpen: false }),
                onDecline: () => setModalState({ ...modalState, isOpen: false })
            });
            return
        }

        setModalState({ ...modalState, isOpen: false })
    }
    return ( 
        <div className="fixed bottom-24 w-full flex justify-center left-0 gap-4">
            <Button className="text-blue-400 border-blue-400 w-full ml-4" onClick={() => setShowDelete(false)}>{u("Cancel")}</Button>
            <Button className="bg-blue-400 text-white w-full mr-4" onClick={handleOpenModal}>{u("Delete")}</Button>
        </div>
     );
}

export default DeleteSchemaOptions;
