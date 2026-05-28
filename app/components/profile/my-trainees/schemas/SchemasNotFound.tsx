'use client'
import { useTranslations } from "next-intl";

function SchemasNotFound() {
    const t = useTranslations('Errors')
    return ( 
        <div className="text-center text-gray-400 bg-darkLight rounded-lg p-5">
            {t('SchemasNotFound')}
        </div>
     );
}

export default SchemasNotFound;