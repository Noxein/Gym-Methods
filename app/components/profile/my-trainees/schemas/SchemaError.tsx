'use client'

import { useTranslations } from "next-intl";

function SchemaError({error}:{error:string}) {
    const e = useTranslations('Errors')
    return ( 
        <div className="text-center text-red-500">
            {e(error)}
        </div>
    );
}

export default SchemaError;