'use client'
import { Button } from "@/app/components/ui/Button";

type DeleteSchemasButtonProps = {
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteSchemasButton({ setShowDelete }: DeleteSchemasButtonProps) {
    return ( 
        <div className="fixed bottom-24 w-full flex justify-center left-0">
            <Button className="text-blue-400 border-blue-400 w-full mx-5" onClick={() => setShowDelete(true)}>Delete Schemas</Button>
        </div>
     );
}

export default DeleteSchemasButton;