'use client'
import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";

type DeleteSchemasButtonProps = {
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteSchemasButton({ setShowDelete }: DeleteSchemasButtonProps) {
    const t = useTranslations("Home/Profile/My-Trainees/Schemas")

    return ( 
        <div className="mb-48 mt-auto w-full max-w-mobile flex justify-center left-0">
            <Button className="text-blue-400 border-blue-400 w-full mx-5" onClick={() => setShowDelete(true)}>{t("DeleteSchemas")}</Button>
        </div>
     );
}

export default DeleteSchemasButton;
