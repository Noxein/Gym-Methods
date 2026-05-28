'use client'
import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function AddNewSchemaButton() {

    const router = useRouter()

    const t = useTranslations('Home/Profile/My-Trainees/Schemas')

    return ( 
        <Button isPrimary className="bg-blue-400" onClick={() => router.push('/home/profile/my-trainees/schemas/create')}>
            {t('AddNewSchema')}
        </Button>
     );
}

export default AddNewSchemaButton;