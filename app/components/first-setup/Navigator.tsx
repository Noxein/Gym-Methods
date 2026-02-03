import { Button } from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";

type NavigatorProps = {
    prev:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    next:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    hideNext?: boolean,
    hidePrev?: boolean
}

function Navigator({prev,next,hideNext,hidePrev}:NavigatorProps) {

    const t = useTranslations("FirstSetup")

    return ( 
        <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5 gap-4`}>
            {!hidePrev && <Button className='flex-1 text-2xl' onClick={prev}>{t("Back")}</Button>}
            {!hideNext && <Button className='flex-1 text-2xl' isPrimary onClick={next}>{t("Next")}</Button>}
        </div>
     );
}

export default Navigator;