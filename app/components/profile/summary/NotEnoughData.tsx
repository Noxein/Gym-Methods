'use client'
import { useTranslations } from "next-intl";
import { BlurBackgroundModal } from "../../BlurBackgroundModal";
import { ErrorDiv } from "../../ui/ErrorDiv";

function NotEnoughData() {

    const e = useTranslations("Errors")

    return ( 
        <BlurBackgroundModal>
            <ErrorDiv error={e("Something went wrong")}/>
        </BlurBackgroundModal>
     );
}

export default NotEnoughData;