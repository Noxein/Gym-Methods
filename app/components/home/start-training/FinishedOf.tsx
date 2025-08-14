'use client'

import { useTranslations } from "next-intl";

type FinishedOfTypes = {
    currentplanindex: number,
    total: number,
}

function FinishedOf({currentplanindex,total}:FinishedOfTypes) {
    const t = useTranslations('Home');
    
    return ( 
    <p className="text-sm text-neutral-400">
        {currentplanindex} {t("Of")} {total} {t("Finished")}
    </p>
     );
}

export default FinishedOf;