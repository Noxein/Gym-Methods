import { FirstSetupFirstStep, FirstSetupSelectedSteps, UserPurposeType } from "@/app/types";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { Select } from "../ui/SelectField";
import { CenterComponent } from "../CenterComponent";
import Navigator from "./Navigator";

type PurposeProps = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
    purpose:UserPurposeType,
    setPurpose:React.Dispatch<React.SetStateAction<UserPurposeType>>,
}
function Puropse({setCurrentStep,purpose,setPurpose}:PurposeProps) {

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    const purposeOptions = ['Casual','Trener','Podopieczny trenera']

    const handlePurposeChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setPurpose(e.target.value as UserPurposeType)
    }
    return ( 
        <CenterComponent>
            
                <div className="flex flex-col items-center justify-center flex-1 mx-5" >
                    <h1 className="text-3xl font-medium mb-10 text-center text-white">{t("PurposeQuestion")}</h1>

                    <Select 
                        labelName={t("UserType")}
                        valuesToLoop={purposeOptions}
                        name='advancmentlevel'
                        onChange={handlePurposeChange}
                        value={purpose}                        
                        />
                </div>
                    <Navigator 
                        prev={()=>setCurrentStep('setavatar')}
                        next={e=>{setCurrentStep('final');e.preventDefault()}}
                    />
             
    </CenterComponent>);
}

export default Puropse;
