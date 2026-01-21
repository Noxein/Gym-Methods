import { FirstSetupSelectedSteps } from "@/app/types";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { Select } from "../ui/SelectField";
import { CenterComponent } from "../CenterComponent";

type PurposeProps = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupSelectedSteps>>,
}
function Puropse({setCurrentStep}:PurposeProps) {

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    const purposeOptions = ['Trener','Casual','Podopieczny trenera']
    return ( 
        <CenterComponent>
            <div className="text-white mx-5 mb-20">
                
                    <h1 className="text-3xl font-medium mb-10 text-center">W jakim celu używasz aplikacji?</h1>

                    <Select 
                        labelName={'Typ użytkownika'}
                        valuesToLoop={purposeOptions}
                        name='advancmentlevel'/>

                    <div className={`fixed bottom-0 left-0 right-0 flex mx-5 mb-5 gap-4`}>
                        <Button className='flex-1 text-2xl' onClick={()=>setCurrentStep('language')}>{t("Back")}</Button>
                        <Button className='flex-1 text-2xl' isPrimary onClick={e=>{setCurrentStep('goal');e.preventDefault()}}>{t("Next")}</Button>
                    </div>
                
            </div> 
    </CenterComponent>);
}

export default Puropse;